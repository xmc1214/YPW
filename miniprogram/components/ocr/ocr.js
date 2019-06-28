/* global wx, Component */
const MODES = ['GeneralBasicOCR', 'IDCardOCR']
import regeneratorRuntime from '../../libs/runtime'
import TcbService from '../../libs/tcb-service-mp-sdk/index'
const tcbService = new TcbService()

Component({
    data: {
        hasUploaded: false,
        result: null,
        fileID:'/images/upload.png',
        idcardResMap: {
          Name: { label: '姓名' },
          Sex: { label: '性别' },
          Nation: { label: '民族' },
          Birth: { label: '出生日期' },
          Address: { label: '地址' },
          IdNum: { label: '身份证号' },
          Authority: { label: '发证机关' },
          ValidDate: { label: '证件有效期' },
        },
    },

    methods: {
        handleUploadTap() {
            this.uploadImage();
        },

        async handleRecognizeTap() {
            await this.callFunction();
        },

        uploadImage() {
            // 重新上传，清空结果
            this.setData({
              result: null,
            })

            wx.chooseImage({
                success: (dRes) => {
                    wx.showLoading({
                        title: '上传中',
                    });

                    const fileName = dRes.tempFilePaths[0];
                    const dotPosition = fileName.lastIndexOf('.');
                    const extension = fileName.slice(dotPosition);
                    const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}${extension}`;

                    wx.cloud.uploadFile({
                      cloudPath,
                        filePath: dRes.tempFilePaths[0],
                        success: (res) => {
                            this.setData({
                              fileID: res.fileID,
                              hasUploaded: true
                            }, () => {
                              wx.hideLoading()
                            });
                        },
                        fail: () => {
                            wx.hideLoading();
                            wx.showToast({
                                title: '上传失败',
                                icon: 'none',
                            });
                        },
                    });
                },
            });
        },

        async callFunction() {
            wx.showLoading({
                title: '认证中',
                icon: 'none',
            });

            let funcName = this.data.mode;
            if (MODES.indexOf(funcName) === -1) throw new Error(`未知识别模式: ${funcName}`);

            try {
              let result = await tcbService.callService({
                  service: 'ai',
                  action: funcName,
                  data: {
                    FileID: this.data.fileID
                  }
              })
              wx.hideLoading();

              if (!result.code && result.data) {
                this.setData({
                  result: result.data,
                }, () => {
                  this.triggerEvent('finish', result.data);
                });
              }
              else {
                console.log(result);
                wx.showToast({
                  title: '认证失败',
                  icon: 'none',
                })
              }
            }
            catch (e) {
              wx.hideLoading();
              wx.showToast({
                title: '认证失败',
                icon: 'none',
              })
              console.log(e);
            }
        },
    },

    properties: {
        uploadText: {
            type: String,
            value: '上传身份证正面',
        },
        recognizeText: {
            type: String,
            value: '开始认证',
        },
        mode: {
          type: String,
        },
    },
});

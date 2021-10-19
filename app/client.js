'use strict'

class Phone {

    constructor() {
        this.base_url = 'http://localhost:3000';
        this.items = [];
    }

    buildUrlForGet(endpoint, params) {
        let dc = Math.random(Number.MAX_SAFE_INTEGER).toString();
        let prm = '';
        if (!!params) {
            prm = '&' + params;
        }
        return this.base_url + endpoint + '?_dc=' + dc + prm;
    }

    loadItems() {
        var me = this;
        return new Promise(function (resolve, reject) {
            let url = me.buildUrlForGet('/items');
            var request = new XMLHttpRequest();
            console.log('get url', url)
            request.open('GET', url);
            request.responseType = 'json';
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(Error('Items didn\'t load successfully; error code:' + request.statusText));
                }
            };
            request.onerror = function () {
                reject(Error('There was a network error'));
            };
            request.send();
        });
    }

    postSelectItem(value) {
        var me = this;
        return new Promise(function (resolve, reject) {
            let url = me.buildUrlForGet('/select/'+value);
            var request = new XMLHttpRequest();
            request.open('POST', url);
            request.responseType = 'text';
            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(Error('Items didn\'t load successfully; error code:' + request.statusText));
                }
            };
            request.onerror = function () {
                reject(Error('There was a network error'));
            };
            request.send();
        });
    }

    getBtnRefresh() {
        return document.getElementById('btn-refresh');
    }

    getBtnSelect() {
        return document.getElementById('btn-select');
    }

    getBtnConfirm() {
        return document.getElementById('btn-confirm');
    }

    getPhoneSelect() {
        return document.getElementById('phone-select');
    }

    fillSelect(items) {
        let phoneSelect = this.getPhoneSelect();
        phoneSelect.innerHTML = '';
        for (var i = 0; i < items.length; i++) {
            phoneSelect.innerHTML = phoneSelect.innerHTML +
                '<option value="' + items[i]['id'] + '">' + items[i]['name'] + '</option>';
        }
    }

    init() {
        var me = this;
        let btnRefresh = this.getBtnRefresh();
        let btnSelect = this.getBtnSelect();
        let btnConfirm = this.getBtnConfirm();

        btnConfirm.onclick = function (events) {
          (events.target.checked)
              ? btnSelect.disabled = false
              : btnSelect.disabled = true
        };
        btnRefresh.onclick = function () {
            btnRefresh.disabled = true;
            me.loadItems()
                .then((result) => {
                    me.fillSelect(result);
                })
                .finally(() => {
                    btnRefresh.disabled = false;
                    btnSelect.disabled = true;
                    btnConfirm.checked = false
                })
        };
        btnSelect.onclick = function () {
            btnSelect.disabled = true;
            var phoneSelect = document.getElementById("phone-select");
            var selected = phoneSelect.value;

            if(phoneSelect.value === "0") {
                alert("Вы не выбрали телефон")
                btnConfirm.checked = false
            } else {
                me.postSelectItem(selected)
                    .then((result) => {
                        btnRefresh.click()
                        alert(result);
                    });
            }
        };
    }
}

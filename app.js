'use strict';

/**
 * localstorage Module module of the application.
 */

var localStorageApp = angular.module('localStorageApp', []);

localStorageApp.service('localStorageService',function () {

    var that = this;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var isEmptyObj = function (obj) {
        if (obj == null) return true;
        if (obj.length > 0) {
            return false;
        }
        if (obj == null) return true;
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key))
                return false;
        }
        return false;
    }
    var checkExpiry = function (retrievedItem, itemName) {
        var storedTime = retrievedItem.time;
        var current_time = new Date();
        var retrivedTime = current_time.getTime();
        var time_difference = Math.floor((retrivedTime - storedTime) / 1000);
        if (time_difference > 120) {
            that.removeLocalStorage(itemName);
        }
        else {
            return retrievedItem;
        }
    };
    this.setItem = function (itemName, obj) {
        var storedTime = new Date();
        if (!isEmptyObj(obj)) {
            obj.time = storedTime.getTime();
            try{
                localStorage.setItem(itemName, angular.toJson(obj));
            }
            catch(e){
                console.log("local storge is not supported--"+e);
            }

        }
    };
    this.getItem = function (itemName) {
        try {
            var retrievedItem = angular.fromJson(localStorage.getItem(itemName));
        }
        catch(e){
            console.log("local storge is not supported--"+e);
        }
        if (!isEmptyObj(retrievedItem)) {
            var parsedRetrivedItem = retrievedItem;
            return parsedRetrivedItem;
        }
        else {
            that.removeLocalStorage();
        }
    };
    this.getItemWithExpireCheck = function (itemName) {
        try {
            var retrievedItem = angular.fromJson(localStorage.getItem(itemName));
        }
        catch(e){
            console.log("local storge is not supported--"+e);
        }
        if (!isEmptyObj(retrievedItem)) {
            var retrivedLocalStorage = checkExpiry(retrievedItem, itemName);
            return retrivedLocalStorage;
        }
        else {
            that.removeLocalStorage();
        }

    };
    this.removeLocalStorage = function (itemName) {
        localStorage.removeItem(itemName);
    };
    this.addLocalstorageListner = function (callback) {
        window.addEventListener('storage', callback, false);
    }
    this.removeLocalstorageListner = function (callback) {
        window.removeEventListener('storage',callback,false);
    }

});
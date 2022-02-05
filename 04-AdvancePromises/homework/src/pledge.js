"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = value;
    this._callHandlers();
  }
  return this._value;
};

$Promise.resolve = function (value){
    if(value instanceof $Promise){
        if(value) return value
    }
    const res = new $Promise(()=>{},()=>{});
    res._value = value;
    res._state = "fulfilled"; 
    return res;
};

$Promise.all = function (value){

    if(Array.isArray(value)){
        if(value[0] instanceof $Promise){
            let r = new $Promise(()=>{}, () =>{});
            r._value= value.map(el => el._value);
            r._state = "fulfilled"
            return r
        }
        const res = new $Promise(()=>{}, () =>{});
        res._value= value;
        res._state = "fulfilled"; 
        return res
    } 
    else throw new TypeError();
};

$Promise.prototype._internalReject = function (value) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = value;
    this._callHandlers();
  }
  return this._value;
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    let current = this._handlerGroups.shift();
    if (this._state === "fulfilled") {
      if (current.successCb) {
        try {
          const resultad = current.successCb(this._value);
          if(resultad instanceof $Promise){
            resultad.then(
                (value) => current.downstreamPromise._internalResolve(value),
                (value) => current.downstreamPromise._internalReject(value)
            )
          }else{
          current.downstreamPromise._internalResolve(resultad);
          }
        } catch (e) {
          current.downstreamPromise._internalReject(e);
        }
      } else current.downstreamPromise._internalResolve(this._value);
    } else if (this._state === "rejected") {
      if (current.errorCb) {
        try {
          const error = current.errorCb(this._value);
          if(error instanceof $Promise){
            error.then(
                (value) => current.downstreamPromise._internalResolve(value),
                (value) => current.downstreamPromise._internalReject(value)
            )
          }else{
          current.downstreamPromise._internalResolve(error);
          }
        } catch (e) {
            current.downstreamPromise._internalReject(e);
        }
      } else current.downstreamPromise._internalReject(this._value);
    }
  }
  //this._internalResolve(this._value)
};

$Promise.prototype.then = function (successCb, errorCb) {
  const downstreamPromise = new $Promise(() => {});
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  this._handlerGroups.push({ successCb, errorCb, downstreamPromise });
  if (this._state !== "pending") {
    this._callHandlers();
  }
  return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

"use strict";
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function cmpInc(a,b) {
    var diff = a - b;
    if(isNaN(diff)) {
        throw NaN;
    }
    return diff;
};

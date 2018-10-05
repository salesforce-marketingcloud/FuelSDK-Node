const fs = require('fs');
const path = require('path');


class CacheService {

    constructor({clientId, clientSecret}) {
        this._identifier = `${clientId}-${clientSecret}`;
        this._cacheDir = path.join(__dirname, '../../.cache');
        this._cacheMinutes = 10;
    }

    get() {
        return this._getOrCreateFile().then(cache => {
            const data = cache[this._identifier];
            const now = new Date().getTime();
            if (!data || !data.expires || data.expires < now) {
                return {};
            } else {
                return data;
            }
        });
    }

    write(url) {
        const expires = new Date().getTime() + this._cacheMinutes * 60 * 1000;
        return this._getOrCreateFile().then(cache => {
            cache[this._identifier] = {
                expires,
                url
            };
            return this._writeFile(JSON.stringify(cache)).then(() => undefined);
        });
    }

    clear() {
        return this._getOrCreateFile().then(cache => {
            delete cache[this._identifier];
            return this._writeFile(JSON.stringify(cache));
        });
    }

    _getOrCreateFile() {
        return this._checkFile().then(exists => {
            if (!exists) {
                return this._writeFile({flag: 'wx'}).then(() => {
                    return {};
                });
            } else {
                return this._readFile().then(data => {
                    let cache = {};
                    try {
                        cache = JSON.parse(data)
                    } catch (err) {
                    }
                    return cache || {};
                });
            }
        });
    }

    _checkFile() {
        return new Promise(resolve => {
            fs.access(this._cacheDir, fs.constants.F_OK | fs.constants.W_OK, err => {
                if (err) {
                    if (err.code !== 'ENOENT') {
                        throw new Error(err);
                    }
                    resolve(false)
                }
                resolve(true);
            });
        })
    }

    _writeFile(contents) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this._cacheDir, contents, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    }

    _readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this._cacheDir, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }

}

module.exports = CacheService;
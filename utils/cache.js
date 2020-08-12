function cache(timeout = 1000 * 30){
    this.cachded = {};
    this.timeout = timeout;

    this.get = function(key) {
        const now = new Date();
        if(this.cachded[key] &&
            now - this.cachded[key].cachedTime < this.timeout){
            return this.cachded[key].value;
        }

        return false
    }

    this.cache = function(key, value) {
        const cachedTime = new Date();
        
        this.cachded[key] = {
            value,
            cachedTime
        }
    }
}

module.exports = cache;
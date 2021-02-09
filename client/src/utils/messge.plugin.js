export default {
    install(Vue, options) {
        Vue.prototype.$message = function (html) {
            M.toast({html})
        }
        Vue.prototype.$error = function (html) {
            M.toast({html: `[Ошибка]: ${html}`})
        }
        Vue.prototype.$done = function (html) {
            M.toast({html})
        }
        Vue.prototype.$counter = function (val) {
            M.CharacterCounter.init(val)
        }
        Vue.prototype.$popup = function () {
           return  M.Modal
        }
    }
}

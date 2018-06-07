define("config", function() {

    require.config({

        urlArgs: "v=" + new Date().getTime(),
        baseUrl: "./js",
        paths: {
            "jquery": ["lib/jquery-3.3.1", "https://cdn.bootcss.com/jquery/3.3.1/jquery"],
            "md5": ["lib/jquery.md5"],
            "idcode": ["lib/idcode/jquery.idcode"],
            "jquery.validation": ["lib/jquery-validation/jquery.validate"],
            "additional.methods": ["lib/jquery-validation/additional-methods"],
            "jquery.cookie": ["lib/jquery-cookie/jquery.cookie"]
        },
        shim: {
            "md5": {
                deps: ["jquery"]
            },
            "idcode": {
                deps: ["jquery"]
            }
        }
    })
})
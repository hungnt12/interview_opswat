'use strict'

module.exports = {
    send: (res, error, data) => {
        if(error){
            return res.send({
                status: "ERROR",
                errors: [error],
                data: null
            })
        }

        return res.send({
            status: "SUCCESS",
            errors: null,
            data: data.result ? data : {result: data}
        })
    }
}
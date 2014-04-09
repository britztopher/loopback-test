

// ############ LOGGER specific functions ##################

// logs to stderr and is blocking
exports.error = function(msg, err) {

    var colorStart = "\033[0;31m";    // red
    var colorEnd = "\033[0m";

    if (err){

        if (err.stack){
            console.error(colorStart + "ERROR: " + colorEnd + formatDate() + msg + ", exception: " + err + "\n" + err.stack);  //stderr
            console.log(colorStart + "ERROR: " + colorEnd + formatDate() + ":" + msg + ", exception: " + err + "\n" + err.stack);    //stdout
        }
        else{

            console.error(colorStart + "ERROR: " + colorEnd + formatDate() + msg + ", error: " + err);  //stderr
            console.log(colorStart + "ERROR: " + colorEnd + formatDate() + ":" + msg + ", error: " + err);    //stdout
        }

    }
    else{
        console.error(colorStart + "ERROR: " + colorEnd + formatDate() + msg);  //stderr
        console.log(colorStart + "ERROR: " + colorEnd + formatDate() + ":" + msg);    //stdout
    }

}

exports.warning = function(msg) {

    console.error("WARNING: " + formatDate() + msg);
    console.log("WARNING: " + formatDate() + ":" + msg);

}

exports.debug = function(msg, obj) {

    var colorStart = "\033[0;36m";    // blue
    var colorEnd = "\033[0m";

    if (obj){

        //var colorStartObj = "\033[0;33m";    // brown
        //var colorEndObj = "\033[0m";

        console.log(colorStart + "DEBUG: " + colorEnd + formatDate() + msg, obj);
    }
    else{
        console.log(colorStart + "DEBUG: " + colorEnd + formatDate() + msg);
    }

}

exports.info = function(msg, obj) {

    var colorStart = "\033[0;34m";    // blue
    var colorEnd = "\033[0m";

    if (obj){

        //var colorStartObj = "\033[0;33m";    // brown
        //var colorEndObj = "\033[0m";

        console.log(colorStart + "INFO: " + colorEnd + formatDate() + msg, obj);
    }
    else{
        console.log(colorStart + "INFO: " + colorEnd + formatDate() + msg);
    }

}

exports.log = function(msg, obj) {

    var colorStart = "\033[0;34m";    // blue
    var colorEnd = "\033[0m";

    if (obj){
        console.log(colorStart + "INFO: "+ colorEnd + formatDate() + msg, obj);
    }
    else{
        console.log(colorStart + "INFO: "+ colorEnd + formatDate() + msg);
    }

}

// LOCAL private helper methods #######################

function formatDate()
{
    var d = new Date();
    var month = d.getMonth();
    var day = d.getDate();
    month = month + 1;
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();

    var colorStart = "\033[0;32m";    // green
    var colorEnd = "\033[0m ";

    month = month + "";

    if (month.length == 1)
    {
        month = "0" + month;
    }

    day = day + "";

    if (day.length == 1)
    {
        day = "0" + day;
    }

    return colorStart + month + "-" + day + "-" + d.getFullYear() + ":" + h + ":" + m + ":" + s + ":" + ms + colorEnd;
}


// ############### END LOGGER ##################################
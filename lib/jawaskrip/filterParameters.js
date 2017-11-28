/**
 * @author indmind <mail.indmind@gmail.com>
 * @file filter parameter
 * @version 0.0.2
 * 
 */

 /**
  * @func filter
  * @returns {Array} - action yang akan dilakukan
  */
module.exports = (_par) => {
    let data = [];
    /**
     * help parameter (-h)
     * log bantuan dan stop proses
     */
    if(_par.includes("-h")){
        console.log("this is help");
        data.exit = true;
    }
    /**
     * compile parameter (-c)
     * log compiled script ke stdout
     * jawaskrip <file> -c > out.js (output > out.js)
     */
    if(_par.includes("-c")){
        data.compile = true;
    }
    /**
     * run parameter (-r)
     * eksekusi hasil compiled
     * jawaskrip <file> -v
     */
    if(_par.includes("-r")){
        data.run = true;
    }
    /**
     * version parameter (-c)
     * log versi jawaskrip
     */
    if(_par.includes("-v")){
        console.log(process.version);
        data.exit = true;
    }
    // return action
    return data;
};
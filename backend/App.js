var http = require("http");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const {
    Server
} = require("socket.io");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const e = require("express");

const server = http.createServer(app);

// live

// const io = new Server(server, {
//     cors: {
//         origin: "http://colorgame.fairyfloss.in",
//         methods: ["GET", "POST"],
//     },
// });

//  local

const io = new Server(server, {
    cors: {
        origin: "https://sachin9572.netlify.app",
        methods: ["GET", "POST"],
    },
});

const db = mysql.createConnection({
    user: "un8vaxpeifjhmdqq",
    host: "bsxjprxi5znvqqoenlgu-mysql.services.clever-cloud.com",
    database: "bsxjprxi5znvqqoenlgu",
    //dateStrings: true,
     password: "KcH1dxMKCiP9Jv0oaNfJ",
});

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'database-3.cs19xzkqe2xb.us-east-1.rds.amazonaws.com',
//     database: 'colordb',
//     password:'Passwordhr30098'

// });

let live = [];

// var connectCounter = 0;

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (isvaliduser(token, socket)) {
        next();
    } else {
        next(new Error("Socket authentication error"));
    }
});

async function isvaliduser(token, socket) {
    db.query(
        `SELECT * FROM users WHERE userTokan='${token}'`,
        async (err, result) => {
            if (err) {} else {
                if (result.length === 1) {



                    for (var i = 0; i < live.length; i++) {

                        if (live[i].token === token && live[i].socketid !== socket.id) {
                            io.to(live[i].socketid).emit("close", "connection");

                            live.splice(i, 1);


                        }
                    }

                    live.push({
                        token,
                        socketid: socket.id
                    });



                    return true;



                } else {
                    return false;
                }
            }
        }
    );
}

io.on("connection", (socket) => {



    // connectCounter++;



    //console.log(`User Connected: ${socket.id}`);
    // db.query(`SELECT * FROM counttime WHERE id='2'`, (err, result) => {
    //     if (result) {
    //         var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
    //         socket.emit("receive_message", resultArray[0]);
    //     } else {
    //         console.log(err);
    //     }
    // });

    socket.on("get_user_Live", (data) => {
        socket.emit("user_Live", live.length);

    });
    socket.on("receive_message_sub", (data) => {

        // for (var i = 0; i < block.length; i++) {
        //     if (block[i].socketid === socket.id) {
        // block.splice(i, 1);
        // socket.disconnect()

        //     }
        // }
        db.query(
            `SELECT * FROM period ORDER BY id DESC LIMIT 6`,
            (err, result) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    //var resultArray =JSON.stringify(result);
                    //  const rever = resultArray.reverse()
                    //res.status(200).json({ mess: "Successfully", data: resultArray });
                    const hst = [];
                    const count = result.length;
                    for (let i = 0; i <= count-1; i++) {
                        if (result[i].win === '') {

                        } else {
                            hst.push(result[i].win)
                        }
                    }

                    socket.emit("receive_history", hst);
                }
            }
        );

        db.query(`SELECT * FROM counttime WHERE id='2'`, (err, result) => {
            if (result) {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                delete resultArray[0].Id;
                socket.emit("receive_message", resultArray[0]);
            } else {
                console.log(err);
            }
        });


        db.query(`SELECT * FROM period`, (err, result) => {
            if (result) {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                const rever = resultArray.reverse();
                delete rever[0].Id;
                socket.emit("receive_period", rever[0]);


            } else {}
        });
    });


    // //io.emit("user_Live", (connectCounter))
    // db.query(`SELECT * FROM period`, (err, result) => {
    //     if (result) {
    //         var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
    //         const rever = resultArray.reverse();
    //         socket.emit("receive_period", rever[0]);
    //     } else {
    //     }
    // });
    socket.on("user_Details_Get", (data) => {
        // for (var i = 0; i < block.length; i++) {
        //     if (block[i].socketid === socket.id) {
        // block.splice(i, 1);
        // socket.disconnect()

        //     }
        // }
        db.query(
            `SELECT * FROM users WHERE userTokan='${data}'`,
            async (err, result) => {
                if (result?.length == 0) {} else {
                    var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                    delete resultArray[0].userPassword;
                    delete resultArray[0].userMobile;
                    delete resultArray[0].userNickName;
                    delete resultArray[0].userReCode;
                    delete resultArray[0].userStatus;
                    delete resultArray[0].userTokan;
                    delete resultArray[0].userDelete;
                    delete resultArray[0].fatherId;
                    delete resultArray[0].gfId;
                    const usedata = resultArray[0];

                    io.to(socket.id).emit("user_Details", usedata);
                }
            }
        );


    });




    socket.on("disconnect", (reason) => {
        // connectCounter--;

        for (var i = 0; i < live.length; i++) {
            if (live[i].socketid === socket.id) {
                live.splice(i, 1);
            }
        }


        console.log("User Disconnected", socket.id);
        //io.emit("user_Live", (connectCounter))
    });
});

const start = Date.now();
var wop;
//const threeM = 1000 * 30;















var incresePeriod;
const moment = require('moment-timezone');
 const currentTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
console.log(currentTime);
function bettingtime()
{

    const denominations = [10, 100, 500, 1000, 10000];

let totalontie = 0;
let totalonandar = 0;
let totalonbahar = 0;

function getRandomDenomination() {
    const probabilities = [0.15, 0.30, 0.30, 0.15, 0.10]; // Probabilities for denominations
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (rand < cumulativeProbability) {
            return denominations[i];
        }
    }
}

function getRandomOutcome() {
    const outcomes = ['andar', 'bahar', 'tie'];
    const probabilities = [0.48, 0.48, 0.04]; // Probabilities for outcomes
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (rand < cumulativeProbability) {
            return outcomes[i];
        }
    }
}

function sendReceiveLivebet() {
    const user = 0; // assuming user ID is 0
    const outcome = getRandomOutcome();
    let denomination;

    if (outcome === 'tie') {
        denomination = [10][Math.floor(Math.random() * 1)]; // Select 10 or 100 for tie
    } else {
        denomination = getRandomDenomination();
    }

    // Update totals
    if (outcome === 'tie') {
        totalontie += denomination;
    } else if (outcome === 'andar') {
        totalonandar += denomination;
    } else {
        totalonbahar += denomination;
    }

    const data = {
        user: user,
        card: outcome,
        denomination: denomination,
        totalontie: totalontie,
        totalonandar: totalonandar,
        totalonbahar: totalonbahar
    };

    io.emit("receive_livebet", data);
    //console.log("Sent receive_livebet:", data);
}

function scheduleRandomLivebet() {
    const endTime = Date.now() + 19000; // 20 seconds from now

    function emitRandomlyWithin19Seconds() {
        if (Date.now() < endTime) {
            sendReceiveLivebet();
            const delay = Math.floor(Math.random() * 1000); // Change the maximum delay to 1000 milliseconds
            setTimeout(emitRandomlyWithin19Seconds, delay);
        }
    }
    

    emitRandomlyWithin19Seconds();
}

scheduleRandomLivebet(); // Start the process


//      
nowDate1 = Date.now();
timePlue = nowDate1 + 1000 * 20;

//
function getCurrentPeriod() {
    const currentDate = new Date();
    const secondsInDay = 24 * 60 * 60;
    const secondsInPeriod = 30;

    const totalSeconds = currentDate.getHours() * 3600 +
        currentDate.getMinutes() * 60 +
        currentDate.getSeconds();

    const period = Math.floor(totalSeconds / secondsInPeriod);
    const totalPeriods = Math.floor(secondsInDay / secondsInPeriod);
    
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const periodString = year + month + day + period.toString().padStart(4, '0');
    
    return {
        incresePeriod: periodString
    };
}

function getCurrentIST() {
    const currentDate = new Date();
    const ISTOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    return currentDate.toLocaleString('en-IN', ISTOptions);
}

const {incresePeriod } = getCurrentPeriod();
 
 
 

//
 
             
        
        db.query(`SELECT * FROM counttime WHERE id='2'`, (err, result) => {
            if (result) {
                //var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
      
                   
                console.log("BETTING START FOR PERIOD :"+incresePeriod);
               // const useincresePeriod = incresePeriod - 1;
                //console.log(useincresePeriod)
                // const incresePeriod = resultArray[0]?.period.substring(0, 8) == timep ? parseInt(resultArray[0]?.period) + 1 : timep + "0001"
                db.query(
                    `UPDATE  counttime SET endTime='${timePlue}' , period='${incresePeriod}'  WHERE id  = 2 `,
                    (err, result) => {
                        if (err) {} else {}
                    }
                );
                
                db.query(`SELECT * FROM counttime WHERE id='2'`, (err, result) => {
                    if (result) {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                        delete resultArray[0].Id;
                        io.emit("receive_message", resultArray[0]);
                    } else {}
                });
                db.query(
                    `INSERT INTO period (period, duration) VALUES (?,?)`,
                    [incresePeriod, "20000"],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {}
                    }
                );
    
                db.query(`SELECT * FROM period`, (err, result) => {
                    if (result) {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                        const rever = resultArray.reverse();
                        delete rever[0].Id;
                        io.emit("receive_period", rever[0]);
                    } else {
                        console.log(err);
                    }
                });
              //////20 end
                ////// 10 - start
    
               
            } else {}
        });
    //}, threeM);
    
}

var useincresePeriod;

function winnertime()
{
    
    io.emit("winner_card", "waiting");

   
//      
nowDate1 = Date.now();
timePlue = nowDate1 + 1000 * 20;

//
function getCurrentPeriod() {
    const currentDate = new Date();
    const secondsInDay = 24 * 60 * 60;
    const secondsInPeriod = 30;

    const totalSeconds = currentDate.getHours() * 3600 +
        currentDate.getMinutes() * 60 +
        currentDate.getSeconds();

    const period = Math.floor(totalSeconds / secondsInPeriod);
    const totalPeriods = Math.floor(secondsInDay / secondsInPeriod);
    
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const periodString = year + month + day + period.toString().padStart(4, '0');
    
    return {
        useincresePeriod: periodString
    };
}

function getCurrentIST() {
    const currentDate = new Date();
    const ISTOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    return currentDate.toLocaleString('en-IN', ISTOptions);
}

const {useincresePeriod } = getCurrentPeriod();
 
 
              console.log("BETTING STOP FOR PERIOD :"+useincresePeriod);
db.query(
    `SELECT * FROM period`,
    (err, result) => {
        if (result) {
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            const rever = resultArray.reverse();

            db.query(
                `SELECT * FROM orders WHERE period='${useincresePeriod}'`,
                (err, result) => {
                    if (result) {
                        var resultArrays = Object.values(
                            JSON.parse(JSON.stringify(result))
                        );
                        const tie =
                            resultArrays &&
                            resultArrays?.filter((data) => {
                                return data?.cardtype == "tie";
                            });
                        const andar =
                            resultArrays &&
                            resultArrays?.filter((data) => {
                                return data?.cardtype == "andar";
                            });
                        const bahar =
                            resultArrays &&
                            resultArrays?.filter((data) => {
                                return data?.cardtype == "bahar";
                            });

                        var tieTotalAmount = 0;
                        var tieTotalAmount1 = 0;
                        for (let index = 0; index < tie.length; index++) {
                            const element = tie[index]?.amount;
                            tieTotalAmount1 += parseInt(element);
                            tieTotalAmount = tieTotalAmount1 * 4.5;
                        }
                        var andarTotalAmount = 0;
                        var andarTotalAmount1 = 0;
                        for (let index = 0; index < andar.length; index++) {
                            const element = andar[index]?.amount;
                            andarTotalAmount1 += parseInt(element);
                            andarTotalAmount = andarTotalAmount1 * 2;
                        }
                        var baharTotalAmount = 0;
                        var baharTotalAmount1 = 0;
                        for (let index = 0; index < bahar.length; index++) {
                            const element = bahar[index]?.amount;
                            baharTotalAmount1 += parseInt(element);
                            baharTotalAmount = baharTotalAmount1 * 2;
                        }
                        const amountArray = [
                            andarTotalAmount,
                            baharTotalAmount,
                            tieTotalAmount,
                        ];


                        const minAmount = Math.min(
                            andarTotalAmount,
                            baharTotalAmount
                        );

                        const maxAmount = Math.max(
                            andarTotalAmount,
                            baharTotalAmount
                        );


                        const amountIndex = amountArray.indexOf(minAmount);
                        const amountIndex2 = amountArray.indexOf(maxAmount);

                        const justrendom = Math.floor(Math.random() * 3);

                        const winnerRendoms = maxAmount == 0 ? justrendom : amountIndex; //if else ternary condition .

                        const winner = winnerRendoms == 0 ? "andar" : winnerRendoms == 1 ? "bahar" : "tie";
                        




                        ///// probability system starts

                        db.query(
                            `SELECT * FROM gamesettings WHERE id='1'`,
                            (err, result) => {
                                if (result) {
                                    var resultArray = Object.values(
                                        JSON.parse(JSON.stringify(result))
                                    );
                                    // console.log(resultArray[0].endid+">="+ rever[1]?.period +"&&"+ resultArray[0].startid+"<="+rever[1]?.period);
                                    if (resultArray[0]?.type == "1" && resultArray[0].end >= useincresePeriod && resultArray[0].start <= useincresePeriod
                                        
                                    ) {


                                        const winfix = JSON.parse(resultArray[0]?.final);
                                        const wingo = winfix.find(o => o.periodId === useincresePeriod);
                                        const winnerwinsetting = wingo.winner;




                                        if (winnerwinsetting == "W") {

                                            wix = amountIndex;
                                        } else if (winnerwinsetting == "L") {

                                            wix = amountIndex2;
                                        } else if (winnerwinsetting == "T") {

                                            wix = 2;
                                        } else {

                                        }

                                        const justrendom = Math.floor(Math.random() * 3);
                                        const winnerRendom =
                                            maxAmount == 0 ? justrendom : wix;
                                        const winners =
                                            winnerRendom == 0 ?
                                            "andar" :
                                            winnerRendom == 1 ?
                                            "bahar" :
                                            "tie";

                                           //console.log(winners); 
                                                                                  db.query(
                                            `SELECT * FROM winner WHERE period='${useincresePeriod}'`,
                                            (err, result) => {
                                                if (result) {
                                                    if (result?.length == 0) {
                                                        db.query(
                                                            `UPDATE  orders SET win='${winners}'   WHERE Period = '${useincresePeriod}' `,
                                                            (err, result) => {
                                                                if (err) {} else {
                                                                    // console.log("ryt");
                                                                }
                                                            }
                                                        );
                                                        
                                                        db.query(
                                                            `UPDATE period SET win='${winners}'  WHERE Period = '${useincresePeriod}'`,
                                                            (err, result) => {
                                                                if (err) {
                                                                    //    console.log(err);
                                                                } else {
                                                                    
                                                                }
                                                            }
                                                        );
                                                        db.query(
                                                            `INSERT INTO winner (period, win ) VALUES (?,?)`,
                                                            [useincresePeriod, winners],
                                                            (err, result) => {
                                                                if (err) {} else {}
                                                            }
                                                        );
                                                  
 
                                                        db.query(
                                                            `SELECT * FROM orders WHERE Period = '${useincresePeriod}'`,
                                                            async (err, result) => {
                                                                if (err) {} else {
                                                                    var resultArray = Object.values(
                                                                        JSON.parse(JSON.stringify(result))
                                                                    );
                                                                    const winserss =
                                                                        resultArray?.filter((data) => {
                                                                            return (
                                                                                data?.cardtype == winners
                                                                            );
                                                                        });
                                                                    var holder = {};
                                                                    winserss.forEach(function(d) {
                                                                        if (
                                                                            holder.hasOwnProperty(d.UserId)
                                                                        ) {
                                                                            holder[d.UserId] =
                                                                                holder[d.UserId] +
                                                                                parseInt(d.amount);
                                                                        } else {
                                                                            holder[d.UserId] = parseInt(
                                                                                d.amount
                                                                            );
                                                                        }
                                                                    });
                                                                    var obj2 = [];
                                                                    for (var prop in holder) {
                                                                        obj2.push({
                                                                            UserId: prop,
                                                                            amount: holder[prop],
                                                                            Period: prop,
                                                                        });
                                                                    }
                                                                    for (
                                                                        let index = 0; index < obj2.length; index++
                                                                    ) {
                                                                        db.query(
                                                                            `SELECT * FROM wallet WHERE userId="${obj2[index]?.UserId}"`,
                                                                            (err, result) => {
                                                                                if (result) {
                                                                                    var resultArrays =
                                                                                        Object.values(
                                                                                            JSON.parse(
                                                                                                JSON.stringify(result)
                                                                                            )
                                                                                        );

                                                                                    const groshWin = obj2[index]?.amount - (10 / 100) * obj2[index]?.amount;

                                                                                    const winAmount =
                                                                                        parseFloat(
                                                                                            obj2[index]?.amount
                                                                                        ) + groshWin;
                                                                                    const last_updated_Date =
                                                                                        new Date();
                                                                                    const transactionId =
                                                                                        resultArrays[0]?.userId +
                                                                                        "_" +
                                                                                        rever[1]?.period +
                                                                                        "_" +
                                                                                        Math.floor(
                                                                                            10000000 +
                                                                                            Math.random() *
                                                                                            90000000
                                                                                        );
                                                                                    const remainingAmount =
                                                                                        parseFloat(
                                                                                            resultArrays[0]
                                                                                            ?.closeBal
                                                                                        ) + winAmount;
                                                                                    db.query(
                                                                                        `UPDATE  users SET userBalance='${remainingAmount.toFixed(
                                                                                                    2
                                                                                                )}'   WHERE userId="${resultArrays[0]?.userId
                                                                                                }"`,
                                                                                        (err, result) => {
                                                                                            if (err) {} else {}
                                                                                        }
                                                                                    );
                                                                                    db.query(
                                                                                        `UPDATE  wallet SET startBal='${resultArrays[0]
                                                                                                    ?.closeBal
                                                                                                }', closeBal='${remainingAmount.toFixed(
                                                                                                    2
                                                                                                )}'   WHERE userId=${resultArrays[0]?.userId
                                                                                                }`,
                                                                                        (err, result) => {
                                                                                            if (err) {} else {}
                                                                                        }
                                                                                    );
                                                                                    db.query(
                                                                                        `SELECT * FROM users WHERE userId=${resultArrays[0]?.userId}`,
                                                                                        async (err, result) => {
                                                                                            if (err) {} else {
                                                                                                var userDetais =
                                                                                                    Object.values(
                                                                                                        JSON.parse(
                                                                                                            JSON.stringify(
                                                                                                                result
                                                                                                            )
                                                                                                        )
                                                                                                    );
                                                                                                db.query(
                                                                                                    `INSERT INTO transaction (to_id, form_id, amount, previous_balance, current_balance, transaction_id , name, type, periodId ) VALUES (?,?,?,?,?,?,?,?,?)`,
                                                                                                    [
                                                                                                        userDetais[0]
                                                                                                        ?.userId,
                                                                                                        "01",
                                                                                                        winAmount.toFixed(
                                                                                                            2
                                                                                                        ),
                                                                                                        resultArrays[0]
                                                                                                        ?.closeBal,
                                                                                                        remainingAmount.toFixed(
                                                                                                            2
                                                                                                        ),
                                                                                                        transactionId,
                                                                                                        userDetais[0]
                                                                                                        ?.userName,
                                                                                                        "CR",
                                                                                                        useincresePeriod,
                                                                                                    ],
                                                                                                    (err, result) => {
                                                                                                        if (err) {} else {}
                                                                                                    }
                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                } else {}
                                                                            }
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        );
                                                    } else {}
                                                } else {}
                                            }
                                        );
                                        console.log("In "+useincresePeriod+" : ADMIN PROBABILTY USED & "+"Winner is "+winners);

                                        setTimeout(winx, 2000);
                                        function winx(){
                                        io.emit("winner_card", winners);

                                        db.query(
                                            `SELECT * FROM period ORDER BY id DESC LIMIT 6`,
                                            (err, result) => {
                                                if (err) {
                                                    res.status(400).json(err);
                                                } else {
                                                    //var resultArray =JSON.stringify(result);
                                                    //  const rever = resultArray.reverse()
                                                    //res.status(200).json({ mess: "Successfully", data: resultArray });
                                                    const hst = [];
                                                    const count = result.length;
                                                    for (let i = 0; i <= count-1; i++) {
                                                        if (result[i].win === '') {

                                                        } else {
                                                            hst.push(result[i].win)
                                                        }
                                                    }

                                                    io.emit("receive_history", hst);
                                                }
                                            }
                                        );
                                    }
                                         
                                        return;

                                  
                                    }




                                    ///////////////////////////////////  probabilty system ends
                                    else {
                                        
                                        //auto decide random result
                                        const threecolor = ["andar", "bahar", "tie"];
                                        const amountArray = [
                                            andarTotalAmount,
                                            baharTotalAmount,
                                            tieTotalAmount,
                                        ];
                                        const minAmount = Math.min(
                                            andarTotalAmount,
                                            baharTotalAmount,
                                            tieTotalAmount
                                        );
                                        const amountIndex = amountArray.indexOf(minAmount);
                                        const minamountcolor = threecolor[amountIndex];

                                        const conditions =
                                            minamountcolor == winner ? "true" : "false";

                                        //admin use only end
                                        db.query(
                                            `INSERT INTO result (periodId,ona,onb,ont,less,results,conditions) VALUES (?,?,?,?,?,?,?)`,
                                            [
                                                useincresePeriod,
                                                andarTotalAmount1,
                                                baharTotalAmount1,
                                                tieTotalAmount1,
                                                minamountcolor,
                                                winner,
                                                conditions,
                                            ],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    //console.log(result)
                                                }
                                            }
                                        );
                                        db.query(
                                            `SELECT * FROM winner WHERE period='${useincresePeriod}'`,
                                            (err, result) => {
                                                if (result) {
                                                    if (result?.length == 0) {
                                                        db.query(
                                                            `UPDATE  orders SET win='${winner}'   WHERE Period =  '${useincresePeriod}' `,
                                                            (err, result) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                } else {}
                                                            }
                                                        );
                                                        db.query(
                                                            `UPDATE  period SET win='${winner}'  WHERE Period = '${useincresePeriod}'`,
                                                            (err, result) => {
                                                                if (err) {} else {

                                                                  

                                                                }
                                                            }
                                                        );
                                                        db.query(
                                                            `INSERT INTO winner (period, win ) VALUES (?,?)`,
                                                            [useincresePeriod, winner],
                                                            (err, result) => {
                                                                if (err) {} else {

                                                                }
                                                            }
                                                        );
                                                        console.log("In "+useincresePeriod+" : AUTOMATIC PROBABILTY USED & "+"Winner is "+winner);

                                                        setTimeout(winy, 2000);
                                                        function winy(){
                                                        io.emit("winner_card", winner);
                                                        db.query(
                                                            `SELECT * FROM period ORDER BY id DESC LIMIT 6`,
                                                            (err, result) => {
                                                                if (err) {
                                                                    res.status(400).json(err);
                                                                } else {


                                                                    const count = result.length;
                                                                    
                                                                    //var resultArray =JSON.stringify(result);
                                                                    //  const rever = resultArray.reverse()
                                                                    //res.status(200).json({ mess: "Successfully", data: resultArray });
                                                                    const hst = [];
                                                                    
                                                                    for (let i = 0; i <= count-1; i++) {
                                                                        if (result[i].win === '') {

                                                                        } else {
                                                                            hst.push(result[i].win)
                                                                        }
                                                                    }

                                                                    io.emit("receive_history", hst);
                                                                }
                                                            }
                                                        );
                                                    }
                                                         
                                                        db.query(
                                                            `SELECT * FROM orders WHERE Period = '${useincresePeriod}'`,
                                                            (err, result) => {
                                                                if (err) {} else {
                                                                    var resultArray = Object.values(
                                                                        JSON.parse(JSON.stringify(result))
                                                                    );
                                                                    const winserss = resultArray?.filter(
                                                                        (data) => {
                                                                            return data?.cardtype == winner;
                                                                        }
                                                                    );


                                                                    var holder = {};
                                                                    winserss.forEach(function(d) {
                                                                        if (holder.hasOwnProperty(d.UserId)) {
                                                                            holder[d.UserId] =
                                                                                holder[d.UserId] +
                                                                                parseInt(d.amount);
                                                                        } else {
                                                                            holder[d.UserId] = parseInt(
                                                                                d.amount
                                                                            );
                                                                            //  console.log(holder);
                                                                        }
                                                                    });

                                                                    var obj2 = [];
                                                                    for (var prop in holder) {
                                                                        obj2.push({
                                                                            UserId: prop,
                                                                            amount: holder[prop],
                                                                            Period: prop,
                                                                        });
                                                                    }

                                                                    for (
                                                                        let index = 0; index < obj2.length; index++
                                                                    ) {
                                                                        db.query(
                                                                            `SELECT * FROM wallet WHERE userId=${obj2[index]?.UserId}`,
                                                                            (err, result) => {
                                                                                var resultArrays = Object.values(
                                                                                    JSON.parse(
                                                                                        JSON.stringify(result)
                                                                                    )
                                                                                );
                                                                                const groshWin =
                                                                                    obj2[index]?.amount -
                                                                                    (10 / 100) *
                                                                                    obj2[index]?.amount;
                                                                                const winAmount =
                                                                                    parseFloat(
                                                                                        obj2[index]?.amount
                                                                                    ) + groshWin;
                                                                                const last_updated_Date =
                                                                                    new Date();
                                                                                const transactionId =
                                                                                    resultArrays[0]?.userId +
                                                                                    "_" +
                                                                                    rever[1]?.period +
                                                                                    "_" +
                                                                                    Math.floor(
                                                                                        10000000 +
                                                                                        Math.random() * 90000000
                                                                                    );
                                                                                const remainingAmount =
                                                                                    parseFloat(
                                                                                        resultArrays[0]?.closeBal
                                                                                    ) + winAmount;
                                                                                db.query(
                                                                                    `UPDATE  users SET userBalance='${remainingAmount.toFixed(
                                                                                        2
                                                                                    )}'   WHERE userId=${resultArrays[0]?.userId
                                                                                    }`,
                                                                                    (err, result) => {
                                                                                        if (err) {} else {}
                                                                                    }
                                                                                );
                                                                                db.query(
                                                                                    `SELECT * FROM users WHERE userId=${resultArrays[0]?.userId}`,
                                                                                    async (err, result) => {
                                                                                        if (err) {} else {
                                                                                            var userDetais =
                                                                                                Object.values(
                                                                                                    JSON.parse(
                                                                                                        JSON.stringify(result)
                                                                                                    )
                                                                                                );
                                                                                            db.query(
                                                                                                `INSERT INTO transaction ( to_id, form_id, amount, previous_balance, current_balance, transaction_id , name, type, periodId ) VALUES (?,?,?,?,?,?,?,?,?)`,
                                                                                                [
                                                                                                    userDetais[0]?.userId,
                                                                                                    "01",
                                                                                                    winAmount,
                                                                                                    resultArrays[0]
                                                                                                    ?.closeBal,
                                                                                                    remainingAmount.toFixed(
                                                                                                        2
                                                                                                    ),
                                                                                                    transactionId,
                                                                                                    userDetais[0]?.userName,
                                                                                                    "CR",
                                                                                                    useincresePeriod,
                                                                                                ],
                                                                                                (err, result) => {
                                                                                                    if (err) {
                                                                                                        console.log(err);
                                                                                                    } else {
                                                                                                        //    console.log("ha");
                                                                                                    }
                                                                                                }
                                                                                            );
                                                                                        }
                                                                                    }
                                                                                );
                                                                                db.query(
                                                                                    `UPDATE  wallet SET startBal='${resultArrays[0]?.closeBal
                                                                                    }', closeBal='${remainingAmount.toFixed(
                                                                                        2
                                                                                    )}'   WHERE userId=${resultArrays[0]?.userId
                                                                                    }`,
                                                                                    (err, result) => {
                                                                                        if (err) {} else {}
                                                                                    }
                                                                                );
                                                                            }
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        );
                                                    } else {}
                                                } else {}
                                            }
                                        );
                                    }
                                } else {
                                    //console.log("gya")
                                }
                            }
                        );
                        //yha suru


                      


                        setTimeout(wat, 5000);
                        setTimeout(run, 2000);
                       function wat() {

                      io.emit("winner_card", "waiting2");

                          }
                        function run() {
                             
                            db.query(
                                `SELECT * FROM transaction WHERE periodId = '${useincresePeriod}'`,
                                (err, result) => {
                                    if (err) {} else {
                                         
                                        var resultArray = Object.values(
                                            JSON.parse(JSON.stringify(result))
                                        );
                                        const crs = resultArray?.filter((data) => {
                                            return data?.type == "CR";
                                        });
                                        const drs = resultArray?.filter((data) => {
                                            return data?.type == "DR";
                                        });

                                        var crsholder = {};
                                        crs.forEach(function(d) {
                                            if (crsholder.hasOwnProperty(d.to_id)) {
                                                crsholder[d.to_id] =
                                                    crsholder[d.to_id] + parseInt(d.amount);
                                            } else {
                                                crsholder[d.to_id] = parseInt(d.amount);
                                            }
                                        });

                                        var drsholder = {};
                                        drs.forEach(function(d) {
                                            if (drsholder.hasOwnProperty(d.form_id)) {
                                                drsholder[d.form_id] =
                                                    drsholder[d.form_id] + parseInt(d.amount);
                                            } else {
                                                drsholder[d.form_id] = parseInt(d.amount);
                                            }
                                        });

                                        var obj2drs = [];
                                        for (var prop in drsholder) {
                                            obj2drs.push({
                                                to_id: prop,
                                                amount1: drsholder[prop],
                                            });
                                        }

                                        var obj2crs = [];
                                        for (var prop in crsholder) {
                                            obj2crs.push({
                                                form_id: prop,
                                                amount2: crsholder[prop],
                                            });
                                        }
                                        const mergeArrays = (arr1 = [], arr2 = []) => {
                                            let res = [];
                                            res = arr1.map((obj) => {
                                                const index = arr2.findIndex(
                                                    (el) => el["form_id"] == obj["to_id"]
                                                );
                                                const {
                                                    amount2
                                                } =
                                                index !== -1 ? arr2[index] : {};
                                                return {
                                                    ...obj,
                                                    amount2,
                                                };
                                            });
                                            return res;
                                        };
                                        var arraycombine = mergeArrays(obj2drs, obj2crs);
                                        // const myTimeout = setTimeout(fun, 1000);

                                        // function fun() {

                                        // for (let index = 0; index < arraycombine.length; index++) {
                                        doWork(0);
                                        async function doWork(index) {
                                            if (index === arraycombine.length) {
                                                return false;
                                            } else {
                                                const idb = arraycombine[index]?.to_id;
                                                const idba = arraycombine[index]?.amount1;
                                                let change = 0;
                                                if (!arraycombine[index]?.amount2) {
                                                    change =
                                                        arraycombine[index]?.amount1 -
                                                        2 * arraycombine[index]?.amount1;
                                                } else {
                                                    change =
                                                        arraycombine[index]?.amount2 -
                                                        arraycombine[index]?.amount1;
                                                }
                                                db.query(
                                                    `SELECT * FROM users WHERE userId='${idb}'`,
                                                    (err, result) => {
                                                        const userDetais = Object.values(
                                                            JSON.parse(JSON.stringify(result))
                                                        );
                                                        const fathid = userDetais[0]?.fatherId;
                                                        const gfid = userDetais[0]?.gfId;
                                                        const bonusfathid =
                                                            (arraycombine[index]?.amount1 * 0.6) / 100;
                                                        const bonusgfid =
                                                            (arraycombine[index]?.amount1 * 0.4) / 100;



                                                        db.query(`SELECT win FROM period WHERE period = '${useincresePeriod}'`, (err, result) => {
                                                            if (result) {
                                                                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                                                                wop = resultArray[0].win;
                                                                console.log("gfbfgbgf");

                                                           //    console.log(wop);

                                                                db.query(
                                                                    `INSERT INTO wintable (userId,changeoverall,periodId,result,tradeamount,fathid,gfid,fathidbonus,gfidbonus) VALUES (?,?,?,?,?,?,?,?,?)`,
                                                                    [
                                                                        arraycombine[index]?.to_id,
                                                                        change,
                                                                        useincresePeriod,
                                                                        wop,
                                                                        arraycombine[index]?.amount1,
                                                                        fathid,
                                                                        gfid,
                                                                        bonusfathid,
                                                                        bonusgfid,
                                                                    ],
                                                                    (err, result) => {
                                                                        db.query(
                                                                            `SELECT userId,amount,level1amount,level2amount FROM bonuswallet WHERE userId in('${fathid}','${gfid}') ORDER BY userId ASC`,
                                                                            (err, result) => {
                                                                                // console.log(result);
                                                                                let bonuswalletold = 0;
                                                                                let bonuswalletold2 = 0;
                                                                                let bonuswalletoldlevel1 = 0;
                                                                                let bonuswalletoldlevel2 = 0;
                                                                                let bonuswalletoldlevel21 = 0;
                                                                                let bonuswalletoldlevel22 = 0;
                                                                                var userdetal = Object.values(
                                                                                    JSON.parse(JSON.stringify(result))
                                                                                );
                                                                                if (fathid > gfid) {
                                                                                    bonuswalletold =
                                                                                        parseFloat(userdetal[1]?.amount) +
                                                                                        0;
                                                                                    bonuswalletold2 =
                                                                                        parseFloat(userdetal[0]?.amount) +
                                                                                        0;
                                                                                    bonuswalletoldlevel1 = parseFloat(
                                                                                        userdetal[1]?.level1amount
                                                                                    );
                                                                                    bonuswalletoldlevel2 = parseFloat(
                                                                                        userdetal[1]?.level2amount
                                                                                    );
                                                                                    bonuswalletoldlevel21 = parseFloat(
                                                                                        userdetal[0]?.level1amount
                                                                                    );
                                                                                    bonuswalletoldlevel22 = parseFloat(
                                                                                        userdetal[0]?.level2amount
                                                                                    );
                                                                                } else {
                                                                                    bonuswalletold2 = parseFloat(
                                                                                        userdetal[1]?.amount
                                                                                    );
                                                                                    bonuswalletold = parseFloat(
                                                                                        userdetal[0]?.amount
                                                                                    );
                                                                                    bonuswalletoldlevel1 = parseFloat(
                                                                                        userdetal[0]?.level1amount
                                                                                    );
                                                                                    bonuswalletoldlevel2 = parseFloat(
                                                                                        userdetal[0]?.level2amount
                                                                                    );
                                                                                    bonuswalletoldlevel21 = parseFloat(
                                                                                        userdetal[1]?.level1amount
                                                                                    );
                                                                                    bonuswalletoldlevel22 = parseFloat(
                                                                                        userdetal[1]?.level2amount
                                                                                    );
                                                                                }
                                                                                // console.log("UserId :"+idb+" | FatherId :"+fathid+" | GrandFathId :"+gfid+" | Tradeamount :"+arraycombine[index]?.amount1+" | FATHoldBonus :"+bonuswalletold+" | GfoldBonus :"+bonuswalletold2);
                                                                                const bonusw = parseFloat(
                                                                                    (arraycombine[index]?.amount1 *
                                                                                        0.6) /
                                                                                    100
                                                                                );
                                                                                const bonusw2 = parseFloat(
                                                                                    (arraycombine[index]?.amount1 *
                                                                                        0.4) /
                                                                                    100
                                                                                );
                                                                                bonuswalletold += +bonusw.toFixed(2);
                                                                                bonuswalletold2 +=
                                                                                    +bonusw2.toFixed(2);
                                                                                // console.log("FL1 :"+bonuswalletoldlevel1+" | FL2"+bonuswalletoldlevel2+" | GL1"+bonuswalletoldlevel21+" | GL2"+bonuswalletoldlevel22);
                                                                                bonuswalletoldlevel1 +=
                                                                                    +bonusw.toFixed(2);
                                                                                bonuswalletoldlevel2 +=
                                                                                    +bonusw2.toFixed(2);

                                                                                bonuswalletoldlevel21 +=
                                                                                    +bonusw.toFixed(2);
                                                                                bonuswalletoldlevel22 +=
                                                                                    +bonusw2.toFixed(2);

                                                                                // console.log("FL1 :"+bonuswalletoldlevel1+" | FL2"+bonuswalletoldlevel2+" | GL1"+bonuswalletoldlevel21+" | GL2"+bonuswalletoldlevel22);

                                                                                db.query(
                                                                                    `UPDATE bonuswallet SET amount =CASE WHEN userId = '${fathid}' THEN '${bonuswalletold.toFixed(
                                                                                2
                                                                            )}' WHEN userId = '${gfid}' THEN '${bonuswalletold2.toFixed(
                                                                                2
                                                                            )}' END ,level1amount =CASE WHEN userId = '${fathid}' THEN '${bonuswalletoldlevel1.toFixed(
                                                                                2
                                                                            )}' ELSE level1amount END,level2amount =CASE WHEN userId = '${gfid}' THEN '${bonuswalletoldlevel22.toFixed(
                                                                                2
                                                                            )}' ELSE level2amount END WHERE userId in('${fathid}','${gfid}')`,
                                                                                    async (err, result) => {
                                                                                        // console.log(err);
                                                                                        // console.log(" |Fath Comm : "+bonusw+" |Gf Comm : "+bonusw2+" |NewFATHBonus :"+bonuswalletold+" | NewGFBonus :"+bonuswalletold2)

                                                                                        index += 1;
                                                                                        doWork(index);

                                                                                    }
                                                                                );
                                                                            }
                                                                        );
                                                                        //bonustable update fath id -- bonustable,bonuswallet
                                                                    }
                                                                );


                                                            } else {}
                                                        });
                                                    }
                                                );
                                            }
                                        }
                                    }
                                    //ya end
                                }
                            );
                        }

                        
                        //yha end
                    } else {
                        // console.log("err");
                    }
                }
            );
        } else {}
    }
    //
);

}


function checkSecond() {
    const now = new Date();
    const seconds = now.getSeconds();

    if (seconds === 0 || seconds === 30) {
        bettingtime();
    }
    if (seconds === 21 || seconds === 51) {
        winnertime();
    }
}

// Check every second
setInterval(checkSecond, 1000);


 

app.post("/totalAmount", (req, res) => {
    db.query(`SELECT * FROM period`, (err, result) => {
        if (result) {
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            const rever = resultArray.reverse();
            // res.status(200).json({ mess: 'Successfully', data: rever[0] });
            db.query(
                `SELECT * FROM orders WHERE period=${rever[0]?.period}`,
                (err, result) => {
                    if (result) {
                        var resultArrays = Object.values(
                            JSON.parse(JSON.stringify(result))
                        );
                        const tie =
                            resultArrays &&
                            resultArrays?.filter((data) => {
                                return data?.cardtype == "tie";
                            });
                        const andar =
                            resultArrays &&
                            resultArrays?.filter((data) => {
                                return data?.cardtype == "andar";
                            });
                        const bahar =
                            resultArrays &&
                            resultArrays?.filter((data) => {
                                return data?.cardtype == "bahar";
                            });
                        var tieTotalAmount = 0;
                        for (let index = 0; index < tie.length; index++) {
                            const element = tie[index]?.amount;
                            tieTotalAmount += parseInt(element);
                        }
                        var andarTotalAmount = 0;
                        for (let index = 0; index < andar.length; index++) {
                            const element = andar[index]?.amount;
                            andarTotalAmount += parseInt(element);
                        }
                        var baharTotalAmount = 0;
                        for (let index = 0; index < bahar.length; index++) {
                            const element = bahar[index]?.amount;
                            baharTotalAmount += parseInt(element);
                        }
                        const amountArray = [
                            tieTotalAmount,
                            andarTotalAmount,
                            baharTotalAmount,
                        ];
                        const minAmount = Math.min(
                            tieTotalAmount,
                            andarTotalAmount,
                            baharTotalAmount
                        );
                        const amountIndex = amountArray.indexOf(minAmount);
                        const minamountcolor = amountArray[amountIndex];
                        //  console.log("minamountcolor :"+minamountcolor)
                        const winner =
                            amountIndex == 0 ? "tie" : amountIndex == 1 ? "andar" : "bahar";
                        // console.log("winner :"+winner)
                        res.status(200).json({
                            mess: "Successfully",
                            data: {
                                period: rever[0]?.period,
                                tie: tieTotalAmount,
                                andar: andarTotalAmount,
                                bahar: baharTotalAmount,
                            },
                        });
                    } else {}
                }
            );
        } else {
            console.log(err);
        }
    });
});






app.post("/gamesettingmanual", (req, res) => {
    const { periods, selectedResult } = req.body;

    // Create a JSON object with periods as the key and selectedResult as the value
    let jsonObject = { [periods]: selectedResult };
   
    // Convert the JSON object to a string
    let finaloutcome = JSON.stringify(jsonObject);

    console.log(finaloutcome);

    // Update the database with the final outcome
    db.query(
        `UPDATE gamesettings SET manual='${finaloutcome}' WHERE id = 1`,
        (err, result) => {
            if (err) {
                res.status(200).json({
                    message: "Failed",
                    data: err
                });
            } else {
                res.status(200).json({
                    message: "Successfully"
                });
            }
        }
    );
});




app.post("/gamesettingdiff", (req, res) => {
    const { difference} = req.body;

  
    // Update the database with the final outcome
    db.query(
        `UPDATE gamesettings SET diff='${difference}' WHERE id = 1`,
        (err, result) => {
            if (err) {
                res.status(200).json({
                    message: "Failed",
                    data: err
                });
            } else {
                res.status(200).json({
                    message: "Successfully"
                });
            }
        }
    );
});

app.post("/gamesettingtime", (req, res) => {
    const { startTime, endTime, tiePercentage} = req.body;

// Parse the start time string into a Date object
const startTimeDate = new Date(startTime);
const startTimeTimestamp = startTimeDate.getTime();

// Parse the end time string into a Date object
const endTimeDate = new Date(endTime);
const endTimeTimestamp = endTimeDate.getTime();

// Calculate the UTC offset for Indian Standard Time (IST) in milliseconds
const ISTOffsetMilliseconds = 5.5 * 60 * 60 * 1000;

// Add the offset to the UTC start time to get the time in IST
const startTimeIST = new Date(startTimeTimestamp + ISTOffsetMilliseconds);
const formattedStartTime = startTimeIST.toISOString().slice(0, 10).replaceAll("-", "");

// Add the offset to the UTC end time to get the time in IST
const endTimeIST = new Date(endTimeTimestamp + ISTOffsetMilliseconds);
const formattedEndTime = endTimeIST.toISOString().slice(0, 10).replaceAll("-", "");

// Get the current time and set it to midnight
const midnightDate = new Date();
midnightDate.setHours(0, 0, 0, 0);

// Get the current timestamp and timestamp at midnight, both in milliseconds
const currentTimestamp = Number(new Date());
const midnightTimestamp = Number(new Date(midnightDate.toString()));

// Calculate the time elapsed since midnight for start time and end time in seconds, divided by 30
const startTimeElapsedSeconds = (startTimeTimestamp / 1000 - midnightTimestamp / 1000);
const endTimeElapsedSeconds = (endTimeTimestamp / 1000 - midnightTimestamp / 1000);

// Calculate the period identifier for start time and end time
const startTimePeriodIdentifier = String(parseInt(startTimeElapsedSeconds / 30)).padStart(4, '0');
const endTimePeriodIdentifier = String(parseInt(endTimeElapsedSeconds / 30)).padStart(4, '0');

// Combine the date and padded time to create a period identifier for start time and end time
const startPeriodIdentifier = formattedStartTime + startTimePeriodIdentifier;
const endPeriodIdentifier = formattedEndTime + endTimePeriodIdentifier;


const startPeriodNumber = parseInt(startPeriodIdentifier);
const endPeriodNumber = parseInt(endPeriodIdentifier);

// Calculate the difference between endPeriodIdentifier and startPeriodIdentifier
const difference = endPeriodNumber - startPeriodNumber;

// Calculate the total number of periods within the range
const totalPeriods = difference + 1; // Adding 1 to include the endPeriodIdentifier

// Generate an array containing all possible periods
const allPeriods = Array.from({ length: totalPeriods }, (_, index) => {
    const periodNumber = startPeriodNumber + index;
    return periodNumber.toString(); // Convert the number to string format
});

// Shuffle the array
for (let i = allPeriods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPeriods[i], allPeriods[j]] = [allPeriods[j], allPeriods[i]];
}

// Calculate the number of periods to select
const periodsToSelect = Math.floor((tiePercentage / 100) * totalPeriods);

// Select the first periodsToSelect elements from the shuffled array
const selectedPeriods = allPeriods.slice(0, periodsToSelect);

// Create a JSON array with the selected periods
const jsonArray = JSON.stringify(selectedPeriods.map(period => ({ [period]: "T" })));
 

    // Update the database with the final outcome
    db.query(
        `UPDATE gamesettings SET start='${startPeriodIdentifier}',end='${endPeriodIdentifier}',tiepercentage='${tiePercentage}',tiewinarray='${jsonArray}' WHERE id = 1`,
        (err, result) => {
            if (err) {
                res.status(200).json({
                    message: "Failed",
                    data: err
                });
            } else {
                res.status(200).json({
                    message: "Successfully"
                });
            }
        }
    );

 


});



 

app.post("/gamesettingactive", (req, res) => {
    const {
        status
    } = req.body;
    // console.log(status);
    db.query(
        `UPDATE  updatewinner SET status='${status}'   WHERE id  = "1" `,
        (err, result) => {
            if (err) {
                res.status(200).json({
                    mess: "Failed",
                    data: err
                });
            } else {
                res.status(200).json({
                    mess: "Successfully"
                });
            }
        }
    );
});

app.post("/getgamesetting", (req, res) => {
    // const { status } = req.body
    // console.log(status);
    db.query(`SELECT * FROM updatewinner WHERE id='1'`, (err, result) => {
        if (result) {
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            // console.log(resultArray);
            res.status(200).json({
                mess: "Successfully",
                data: resultArray[0]
            });
        }
    });
});


// app.post('/withdrawalUpdate', (req, res) => {
//     const { userId, BankId, requestPayment, current_balance, userName } = req.body
//     db.query(
//         `UPDATE  withdrawal SET win='${winner}'  WHERE userId  = ${userId} `,
//         (err, result) => {
//             if (err) {
//             }
//             else {

//             }
//         }
//     )

// })

app.post("/updateWinner", (req, res) => {
    const {
        winner,
        period
    } = req.body;
    db.query(`SELECT * FROM winner WHERE period=${period}`, (err, result) => {
        if (result) {
            if (result?.length == 0) {
                db.query(
                    `UPDATE  orders SET win='${winner}'  WHERE Period  = ${period} `,
                    (err, result) => {
                        if (err) {} else {}
                    }
                );
                db.query(
                    `INSERT INTO winner (period, win ) VALUES (?,?)`,
                    [period, winner],
                    (err, result) => {
                        if (err) {} else {}
                    }
                );
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {}
        } else {}
    });
});

app.post("/userBalanceUpdate", (req, res) => {
    const {
        userId,
        payment,
        transaction_id
    } = req.body;

    const last_updated_Date = new Date();
    const d = new Date();
    const p = d.toISOString().slice(0, 10);
    var timep = p.replaceAll("-", "");

    const transactionId =
        userId +
        "_" +
        timep +
        "_" +
        Math.floor(10000000 + Math.random() * 90000000);

    db.query(`SELECT * FROM users WHERE userId=${userId}`, (err, result) => {
        if (err) {} else {
            var userData = Object.values(JSON.parse(JSON.stringify(result)));
            if (userData.length == 0) {
                res.status(400).json({
                    mess: "User Not Found"
                });
            } else {
                // console.log(userData);
                db.query(
                    `SELECT * FROM wallet WHERE userId=${userId}`,
                    (err, result) => {
                        if (err) {
                            // console.log(err);
                        } else {
                            var resultArrays = Object.values(
                                JSON.parse(JSON.stringify(result))
                            );

                            const totalAmount =
                                parseFloat(resultArrays[0]?.closeBal) + parseFloat(payment);
                            if (resultArrays.length == 0) {
                                db.query(
                                    `INSERT INTO wallet (userId, startBal, closeBal ) VALUES (?,?,?)`,
                                    [userId, "0", parseFloat(payment)],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            db.query(
                                                `INSERT INTO transaction (to_id, form_id, amount, previous_balance, current_balance, transaction_id , name, type,periodId ) VALUES ("?,?,?,?,?,?,?,?,?")`,
                                                [
                                                    userId,
                                                    "01",
                                                    parseFloat(payment),
                                                    "0",
                                                    parseFloat(payment),
                                                    transaction_id,
                                                    userData[0]?.userName,
                                                    "CR",
                                                    "recharge",
                                                ],
                                                (err, result) => {
                                                    if (err) {
                                                        // console.log(err)
                                                    } else {
                                                        // console.log("Successfully")
                                                    }
                                                }
                                            );
                                            db.query(
                                                `INSERT INTO deposit (userId, transaction_id, amount, date ) VALUES (?,?,?,?)`,
                                                [
                                                    userId,
                                                    transaction_id,
                                                    parseFloat(payment),
                                                    last_updated_Date,
                                                ],
                                                (err, result) => {
                                                    if (err) {
                                                        // console.log(err)
                                                    } else {
                                                        // console.log("Successfully")
                                                    }
                                                }
                                            );

                                            db.query(
                                                `UPDATE  users SET userBalance='${parseFloat(
                                                    payment
                                                )}'   WHERE userId=${userId}`,
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(400).json(err);
                                                    } else {
                                                        res.status(200).json({
                                                            mess: "Successfully"
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            } else {
                                db.query(
                                    `UPDATE  users SET userBalance='${totalAmount}'   WHERE userId=${userId}`,
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(400).json(err);
                                        } else {
                                            db.query(
                                                `INSERT INTO transaction ( to_id, form_id, amount, previous_balance, current_balance, transaction_id , name, type, periodId) VALUES (?,?,?,?,?,?,?,?,?)`,
                                                [
                                                    userId,
                                                    "01",
                                                    parseFloat(payment),
                                                    resultArrays[0]?.closeBal,
                                                    totalAmount,
                                                    transaction_id,
                                                    userData[0]?.userName,
                                                    "CR",
                                                    "recharge",
                                                ],
                                                (err, result) => {
                                                    if (err) {} else {}
                                                }
                                            );

                                            db.query(
                                                `INSERT INTO deposit (userId, transaction_id, amount, date ) VALUES (?,?,?,?)`,
                                                [
                                                    userId,
                                                    transaction_id,
                                                    parseFloat(payment),
                                                    last_updated_Date,
                                                ],
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        // console.log("Successfully")
                                                    }
                                                }
                                            );
                                            db.query(
                                                `UPDATE  wallet SET startBal='${resultArrays[0]?.closeBal}', closeBal='${totalAmount}'  WHERE userId=${userId}`,
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(400).json(err);
                                                    } else {
                                                        res.status(200).json({
                                                            mess: "Successfully"
                                                        });
                                                        // console.log(result);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        }
    });
});

app.post("/allreports", (req, res) => {
    const {
        date
    } = req.body;
    // var date = (new Date()).toISOString().split('T')[0];
    db.query(
        `SELECT * FROM orders WHERE  cast(orderDate as date) = "${date}"`,
        (err, result) => {
            var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));
            const rever = resultArrays.reverse();
            // res.status(200).json(result);
            const userWin = rever?.filter((data) => {
                return data?.cardtype == data?.win;
            });
            var adminWinningAmount = 0;
            for (let index = 0; index < rever.length; index++) {
                const element = rever[index]?.amount;
                adminWinningAmount += parseFloat(element);
            }
            var userWinningAmount = 0;
            for (let index = 0; index < userWin.length; index++) {
                const element = userWin[index]?.amount;
                userWinningAmount += parseFloat(element);
            }
            const gameCommission = (10 / 100) * userWinningAmount;
            const userWinningAmounts = userWinningAmount - gameCommission;
            const admintotalWinningAmount = adminWinningAmount - userWinningAmount;
            const admintotalAmount = admintotalWinningAmount - userWinningAmounts;
            db.query(
                `SELECT * FROM withdrawal WHERE cast(created_at as date) = "${date}"`,
                (err, results) => {
                    var Totalwithdrawal = 0;
                    for (let index = 0; index < results.length; index++) {
                        const element = results[index]?.requestPayment;
                        Totalwithdrawal += parseFloat(element);
                    }
                    const withdawalCommission = (2 / 100) * Totalwithdrawal;

                    //   let withdawalCommission="0";
                    //   if(Totalwithdrawal <=1000 && Totalwithdrawal>0)
                    //   {
                    //     withdawalCommission = 30;
                    //   }
                    //   else
                    //   {
                    //     withdawalCommission = 3 / 100 * Totalwithdrawal
                    //   }
                    db.query(
                        `SELECT * FROM wintable WHERE cast(date as date) = "${date}"`,
                        (err, results) => {
                            var TotalBonus = 0;
                            for (let index = 0; index < results.length; index++) {
                                const element1 = results[index]?.fathidbonus;
                                TotalBonus += parseFloat(element1);
                                const element2 = results[index]?.gfidbonus;
                                TotalBonus += parseFloat(element2);
                            }

                            db.query(
                                `SELECT * FROM deposit WHERE cast(date as date) = "${date}"`,
                                (err, results) => {
                                    var TotalRechageAmount = 0;
                                    for (let index = 0; index < results.length; index++) {
                                        const element = results[index]?.amount;
                                        TotalRechageAmount += parseFloat(element);
                                    }
                                    res.status(200).json({
                                        TotalRechageAmount,
                                        Totalwithdrawal,
                                        withdawalCommission,
                                        admintotalAmount,
                                        gameCommission,
                                        userWinningAmounts,
                                        admintotalWinningAmount,
                                        TotalBonus
                                    });
                                }
                            );
                        }
                    );
                }
            );

        }
    );
});

app.post("/gameCommission", (req, res) => {
    db.query(`SELECT * FROM orders`, (err, result) => {
        var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));
        const rever = resultArrays.reverse();
        const userWin = rever?.filter((data) => {
            return data?.cardtype == data?.win;
        });
        var TotalWinAmount = 0;

        for (let index = 0; index < userWin.length; index++) {
            const element = userWin[index]?.amount;
            TotalWinAmount += parseInt(element);
        }
        const gameCommission = (10 / 100) * TotalWinAmount;
        db.query(`SELECT * FROM withdrawal`, (err, results) => {
            var TotalWinAmountw = 0;
            for (let index = 0; index < results.length; index++) {
                const element = results[index]?.requestPayment;
                TotalWinAmountw += parseInt(element);
            }

            const withdawalCommission = (2 / 100) * TotalWinAmountw;
            //   let withdawalCommission="0";
            //   if(TotalWinAmountw <=1000 && TotalWinAmountw>0)
            //   {
            //     withdawalCommission = 30;
            //   }
            //   else
            //   {
            //     withdawalCommission = 3 / 100 * TotalWinAmountw
            //   }

            db.query(`SELECT * FROM period`, (err, result) => {
                if (result) {
                    var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                    // const rever = resultArray.reverse()

                    const totalGamePlay = resultArray?.length;

                    db.query(`SELECT * FROM deposit`, (err, results) => {
                        var TotalRechageAmount = 0;
                        for (let index = 0; index < results.length; index++) {
                            const element = results[index]?.amount;
                            TotalRechageAmount += parseInt(element);
                        }
                        const TotalRechage = results?.length;

                        return res.json({
                            gameCommission,
                            withdawalCommission,
                            TotalRechageAmount,
                            TotalRechage,
                            totalGamePlay,
                            TotalWinAmountw,
                        });
                        // res.status(200).json({ TotalRechageAmount, Totalwithdrawal, withdawalCommission, admintotalAmount, gameCommission, userWinningAmounts, admintotalWinningAmount });
                    });
                } else {}
            });
        });
    });
});

app.post("/orders", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    const {
        userName,
        time,
        Period,
        cardtype,
        amount
    } = req.body;

    const e = new Date();
    const utcTime = e.getTime();
    const offsetInMilliseconds = 5.5 * 60 * 60 * 1000;
    const d = new Date(utcTime + offsetInMilliseconds);
    const orderDate = d.toISOString().split("T")[0];
    
    // Get the UTC offset for Indian Standard Time (IST) in milliseconds
    // IST is UTC+5:30, so we need to add 5 hours and 30 minutes to UTC
   
    
    // Add the offset to the UTC time to get the time in IST

 
    //20 start


    db.query(
        `SELECT period FROM period ORDER BY id DESC LIMIT 1`,
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                if(result[0].period === Period)
                {
//////// check whether time is in limit or not start
 
db.query(
    `SELECT endTime FROM counttime WHERE id='2'`,
    (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            const csd = Date.now();
           
            if(result[0].endTime > csd)
            {
           //console.log(result[0].endTime +" _"+ csd);

///////////  check whether time is in limit or not end


    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);

   // Update total withdrawal
   db.query('SELECT * FROM users WHERE userId=?', [id], (err, totalplayget) => {
    if (err) {
        console.error("Error fetching wallet:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    else{
    
    const totalAmountadd = parseFloat(parseInt(totalplayget[0].totalplay||0)) + parseFloat(amount);
    db.query(
        'UPDATE users SET totalplay=? WHERE userId=?',
        [totalAmountadd, id],
        (updateErr, result) => {
            if (updateErr) {
                console.error("Error updating total recharge:", updateErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }
           }
    );

   }
});



                db.query(`SELECT * FROM wallet WHERE userId='${id}'`, (err, result) => {
                    var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));

                    if (parseFloat(resultArrays[0]?.closeBal) >= parseFloat(amount)) {
                        const remainingAmount = resultArrays[0]?.closeBal - amount;
                        const last_updated_Date = new Date();
                        const transactionId =
                            id +
                            "_" +
                            Period +
                            "_" +
                            Math.floor(10000000 + Math.random() * 90000000);
                        db.query(
                            `UPDATE  users SET userBalance='${remainingAmount.toFixed(
                                2
                            )}'   WHERE userId=${id}`,
                            (err, result) => {
                                if (err) {} else {}
                            }
                        );
                        db.query(
                            `UPDATE  wallet SET startBal='${resultArrays[0]?.closeBal
                            }', closeBal='${remainingAmount.toFixed(
                                2
                            )}'   WHERE userId=${id}`,
                            (err, result) => {
                                if (err) {} else {}
                            }
                        );

                        // db.query(
                        //     `SELECT * FROM users WHERE userId=${id}`,
                        //     (err, result) => {
                        //         if (result) {
                        //             var resultArray = Object.values(JSON.parse(JSON.stringify(result)))
                        //             delete resultArray[0].userPassword;
                        //             const spg=resultArray[0];
                        //             //console.log(socket.id);

                        //            console.log(tokens);

                        //         } else {
                        //             console.log(err);

                        //         }
                        //     }
                        // )
                        db.query(
                            `INSERT INTO transaction (to_id, form_id, amount, previous_balance, current_balance, transaction_id , name, type , periodId ) VALUES (?,?,?,?,?,?,?,?,?)`,
                            [
                                "01",
                                id,
                                amount,
                                resultArrays[0]?.closeBal,
                                remainingAmount.toFixed(2),
                                transactionId,
                                userName,
                                "DR",
                                Period,
                            ],
                            (err, result) => {
                                if (err) {
                                    // console.log(err)
                                } else {
                                    // console.log("Successfully")
                                }
                            }
                        );

                        db.query(
                            `INSERT INTO orders (userId, userName, time, Period, cardtype, amount , orderDate ) VALUES (?,?,?,?,?,?,?)`,
                            [id, userName, time, Period, cardtype, amount, orderDate],
                            (err, result) => {
                                if (err) {
                                    res.status(400).json(err);
                                } else {
                                    res.status(200).json("Successfully");
                                }
                            }
                        );
                    } else {
                        res.status(400).json({
                            message: "balance insufficient"
                        });
                    }
                });
            } else {}
        }
    );

}
else {
    res.status(400).json({
        message: "Betting Time Close"
    });
}

}
});

    
            }
             
            else {
                res.status(400).json({
                    message: "Wrong Period Provided"
                });
            }

        }
        });
});

app.post("/withdralpaymentchack", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    const {
        BankId,
        requestPayment,
        current_balance,
        userPassword,
        fee,
        channel,
        payableAmount
    } = req.body;
       if(payableAmount<100)
       {
        res.status(400).json({
            error: "WAL"
        });


       }

       else{
    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}' AND userPassword='${userPassword}'`,
        (err, result) => {
            if (result.length === 0) {
                res.status(400).json({
                    error: "LPI"
                });
            } else {
                const userBalance = result[0].userBalance;
                const id = result[0].userId;
                const totalwdd = parseInt(result[0].totalwd);
                const totalplayed = parseInt(result[0].totalplay);
                const totalrcd = parseInt(result[0].totalrc);
                db.query(
                    `SELECT * FROM channelwd WHERE id='${channel}'`,
                    (err, resultw) => {
                        if (resultw[0].Status === 0) {
                            res.status(400).json({
                                error: "KCAC"
                            });
                        } else {
                            var channelname = resultw[0].channelname;
                            if (userBalance < parseFloat(requestPayment)) {
                                res.status(400).json({
                                    error: "INF"
                                });
                            } else if (userBalance != current_balance) {
                                res.status(400).json({
                                    error: "SWW"
                                });
                            } else {
                                db.query(
                                    `SELECT * FROM bankdetails WHERE userId = ${id} AND id = ${BankId} AND userDelete ='1'`,
                                    (err, result) => {
                                        if (result.length === 0) {
                                            res.status(400).json({
                                                error: "BDI"
                                            });
                                        } else {
                                            var accountNumber = result[0].accountNumber;
                                            var ifseCode = result[0].ifseCode;
                                            var upiAccount = result[0].upiAccount;

                                                    
                                                    if (totalplayed < totalwdd) {
                                                        
                                                        res.status(400).json({
                                                            error: "PMTW"
                                                        });
                                                    } else {
                                                          const lpa=totalplayed - totalwdd;
                                                     if (requestPayment>totalplayed - totalwdd) {
                                                        const lpa=totalplayed - totalwdd;
                                                        res.status(400).json({
                                                            cv: "Please Withdraw less Amount than "+lpa+" Rs."
                                                        });
                                                    } 

                                                    else {
                                                        const remainingAmount = userBalance - (parseFloat(requestPayment)).toFixed(2);
                                                        db.query(
                                                            `UPDATE  wallet SET startBal='${userBalance}', closeBal='${remainingAmount.toFixed(2)}'   WHERE userId=${id}`,
                                                            (err, result) => {
                                                                if (err) {
                                                                    // Handle error
                                                                } else {
                                                                    // Handle success
                                                                }
                                                            }
                                                        );
                                                        db.query(
                                                            `UPDATE  users SET userBalance='${remainingAmount.toFixed(2)}'   WHERE userId=${id}`,
                                                            (err, result) => {
                                                                if (err) {
                                                                    // Handle error
                                                                } else {
                                                                    // Handle success
                                                                }
                                                            }
                                                        );
                                                        db.query(
                                                            `INSERT INTO withdrawal (userId, wdchannel, Account ,ifsc,upiid,requestPayment,  current_balance,fee,payableAmount, status) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                                                            [
                                                                id,
                                                                channelname,
                                                                accountNumber,
                                                                ifseCode,
                                                                upiAccount,
                                                                requestPayment,
                                                                userBalance,
                                                                fee,
                                                                payableAmount,
                                                                0
                                                            ],
                                                            (err, result) => {
                                                                if (err) {
                                                                    res.status(400).json(err);
                                                                } else {
                                                                    const totalAmountadd = parseFloat(parseInt(totalwdd || 0)) + parseFloat(requestPayment);
                                                                    db.query(
                                                                        'UPDATE users SET totalwd=? WHERE userId=?',
                                                                        [totalAmountadd, id],
                                                                        (updateErr, result) => {
                                                                            if (updateErr) {
                                                                                console.error("Error updating total recharge:", updateErr);
                                                                                return res.status(500).json({ error: "Internal Server Error" });
                                                                            } else {
                                                                                res.status(200).json({
                                                                                    mess: "Success"
                                                                                });
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }
                                                    }
                                              
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        });

    }
});



app.post("/userExist", (req, res) => {
    const {
        userMobile
    } = req.body;
    db.query(
        `SELECT * FROM users WHERE userMobile = ${userMobile} `,
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                const rever = resultArray.reverse();
                if (rever?.length == 1) {
                    res.status(200).json({
                        /* mess: 'Successfully', */
                        data: "1"
                    });
                } else {
                    res.status(200).json({
                        mess: "User not found",
                        data: "0"
                    });
                }
            }
        }
    );
});

// app.post('/dategameCommission', (req, res) => {
//     db.query(
//         `SELECT * FROM orders`,
//         (err, result) => {
//             console.log(result?.length);
//             var TotalWinAmount = 0
//             for (let index = 0; index < result.length; index++) {
//                 const element = result[index]?.amount;
//                 TotalWinAmount += parseInt(element)
//             }
//             const gameCommission = 2 / 100 * TotalWinAmount
//             db.query(
//                 `SELECT * FROM withdrawal`,
//                 (err, results) => {
//                     console.log(results?.length);
//                     var TotalWinAmountw = 0
//                     for (let index = 0; index < results.length; index++) {
//                         const element = results[index]?.requestPayment;
//                         TotalWinAmountw += parseInt(element)
//                     }
//                     const withdawalCommission = 2 / 100 * TotalWinAmountw
//                     return res.json({ data: { gameCommission, withdawalCommission } });
//                 }
//             )
//         }
//     )
// })

app.post("/paymentStatement", (req, res) => {
    db.query(`SELECT * FROM deposit`, (err, result) => {
        var TotalRechageAmount = 0;
        for (let index = 0; index < result.length; index++) {
            const element = result[index]?.amount;
            TotalRechageAmount += parseInt(element);
        }
        // const gameCommission = 2 / 100 * TotalWinAmount

        db.query(`SELECT * FROM users`, (err, results) => {
            var TotalUserAmount = 0;
            for (let index = 0; index < results.length; index++) {
                const element = results[index]?.userBalance;
                TotalUserAmount += parseInt(element);
            }

            // const withdawalCommission = 2 / 100 * TotalWinAmountw
            db.query(`SELECT * FROM withdrawal`, (err, results) => {
                var TotalWithdrawalAmount = 0;
                for (let index = 0; index < results.length; index++) {
                    const element = results[index]?.requestPayment;
                    TotalWithdrawalAmount += parseInt(element);
                }
                // const withdawalCommission = 2 / 100 * TotalWinAmountw

                return res.json({
                    data: {
                        TotalRechageAmount,
                        TotalUserAmount,
                        TotalWithdrawalAmount
                    },
                });
            });
        });
    });
});

app.post("/showWalletList", (req, res) => {
    db.query(`SELECT * FROM wallet`, (err, result) => {
        return res.json(result);
    });
});

app.post("/allGameHisory", (req, res) => {
    const {
        userId
    } = req.body;

    db.query(
        `SELECT * FROM period ORDER BY id DESC LIMIT 6`,
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                const hst = [];
                const count = result.length;
                for (let i = 0; i <= count-1; i++) {
                    if (result[i].win === '') {

                    } else {
                        hst.push(result[i].win)
                    }
                }


                res.status(200).json({
                    mess: "Successfully",
                    data: hst
                });
            }
        }
    );
});



app.post("/show/admin/Payment", (req, res) => {
    db.query(`SELECT * FROM deposit`, (err, result) => {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
        const rever = resultArray.reverse();

        res.status(200).json({
            mess: "Successfully",
            data: rever
        });
    });
});
app.post("/show/admin/Withdraw", (req, res) => {
    db.query(`SELECT * FROM withdrawal`, (err, result) => {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
        const rever = resultArray.reverse();

        res.status(200).json({
            mess: "Successfully",
            data: rever
        });
    });
});
app.post("/show/admin/BandhanPayment", (req, res) => {
    db.query(`SELECT * FROM bandhanpayments`, (err, result) => {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
        const rever = resultArray.reverse();

        res.status(200).json({
            mess: "Successfully",
            data: rever
        });
    });
});




 

app.post("/admin/periodget", (req, res) => {
    db.query(`SELECT period  FROM period ORDER BY Id DESC LIMIT 1`, (err, result) => {
        
        res.status(200).json(result);
    });
});


 



app.post("/alltransaction", (req, res) => {
    db.query(`SELECT * FROM transaction`, (err, result) => {
        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
        const rever = resultArray.reverse();

        res.status(200).json({
            mess: "Successfully",
            data: rever
        });
    });
});
 



app.post("/gettr", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    const {
        pid
    } = req.body;
    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);
                db.query(
                    `SELECT * FROM orders WHERE UserId='${id}' AND Period = '${pid}'`,
                    (err, result) => {
                        if (result.length === 0) {
                            res.json("");
                        } else if (result.length >= 0) {


                            const tie =
                            result &&
                            result?.filter((data) => {
                                return data?.cardtype == "tie";
                            });
                        const andar =
                        result &&
                        result?.filter((data) => {
                                return data?.cardtype == "andar";
                            });
                        const bahar =
                        result &&
                        result?.filter((data) => {
                                return data?.cardtype == "bahar";
                            });

                        
                        var tta = 0;
                        for (let index = 0; index < tie.length; index++) {
                            const element = tie[index]?.amount;
                            tta += parseInt(element);
                           
                        }
                         
                        var ata = 0;
                        for (let index = 0; index < andar.length; index++) {
                            const element = andar[index]?.amount;
                            ata += parseInt(element);
                             
                        }
                        var bta = 0;
                       
                        for (let index = 0; index < bahar.length; index++) {
                            const element = bahar[index]?.amount;
                            bta += parseInt(element);
                             
                        }
                        const amountArray = [
                            ata,
                            bta,
                            tta,
                        ];
                       
                        // Define a function to create the desired JSON object
                        function createDataArray() {
                            const data = {};
                            data["Period"] = pid;
                            if (amountArray[0] !== 0) {
                                data["andar"] = amountArray[0];
                            }
                            if (amountArray[1] !== 0) {
                                data["bahar"] = amountArray[1];
                            }
                            if (amountArray[2] !== 0) {
                                data["tie"] = amountArray[2];
                            }
                            return [data]; // Wrap the data object in an array
                        }
                        
                        // Create the data array
                        const newDataArray = createDataArray();
                        
                        // Convert the array to a JSON string
                        const newDataJSONString = JSON.stringify(newDataArray);
                        
                        // Print or use newDataJSONString as needed
                        console.log(newDataJSONString);
                        
                        


                            res.status(200).json(newDataJSONString);
                        } else {
                            res.status(400).json({
                                err: err,
                            });
                        }
                    }
                );
            } else {}
        }
    );
});















app.post("/signUp", (req, res) => {
    const {
        userName,
        userMobile,
        userNickName,
        userPassword,
        userReCode,
        userBalance,
        userDelete,
    } = req.body;

    function makeid(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function makeref(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const userOwn = makeref(10);
    const text = makeid(40);
    const crypto = require("crypto");
    const secret = makeid(10);
    const hash = crypto.createHash("sha256", secret).update(text).digest("hex");
    // console.log(text);
    // console.log(secret);
    // console.log(hash);

    // father - gfId

    db.query(
        `SELECT * FROM users WHERE userReCode='${userReCode}'`,
        (err, result) => {

            var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));
            if (result.length === 0) {
                res.status(200).json({
                    mess: "invalidReferCode"
                });

            } else {
                const refid = parseInt(resultArrays[0].userId);
                const fathid = parseInt(resultArrays[0].fatherId);
                db.query(
                    `INSERT INTO users (userName, userMobile, userNickName, userPassword, userReCode, userBalance, userStatus, userTokan, userDelete,fatherId,gfId) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        userName,
                        userMobile,
                        userNickName,
                        userPassword,
                        userOwn,
                        userBalance,
                        "0",
                        hash,
                        userDelete,
                        refid,
                        fathid,
                    ],
                    (err, result) => {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(200).json({
                                token: hash,
                                mess: "Successfully"
                            });
                            //get user id

                            db.query(
                                `SELECT * FROM users WHERE userMobile='${userMobile}'`,
                                (err, resultw) => {
                                    if (resultw) {
                                        var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                                        const id = parseInt(resultArrays[0].userId);


                                        //userid goted
                                        //bonus create + wallet id 
                                        db.query(
                                            `INSERT INTO wallet (userId, startBal, closeBal) VALUES (?,?,?)`,
                                            [id, '0', '0'],
                                            (err, result) => {
                                                if (err) {
                                                    //  res.status(400).json(err);
                                                } else {
                                                    // res.status(200).json("Successfully");
                                                }
                                            }
                                        );


                                        db.query(
                                            `INSERT INTO bonuswallet (userId, amount, level1amount,level2amount,appliedamount) VALUES (?,?,?,?,?)`,
                                            [id, '0', '0', '0', '0'],
                                            (err, result) => {
                                                if (err) {
                                                    //  res.status(400).json(err);
                                                } else {
                                                    // res.status(200).json("Successfully");
                                                }
                                            }
                                        );

                                    } else {
                                        // res.status(400).json(err);
                                    }
                                });




                        }
                    }
                );
            }
        }


    );
});

app.post("/userLogin", (req, res) => {
    const {
        userMobile,
        userPassword
    } = req.body;

    db.query(
        `SELECT * FROM users WHERE userMobile='${userMobile}' AND userPassword='${userPassword}'`,
        (err, result) => {
            if (result.length === 0) {
                res.json("Mobile number and Password is wrong");
            } else if (result.length === 1) {
                const see = JSON.parse(JSON.stringify(result));
                const see2 = parseInt(see[0].userStatus);

                if (see2 === 1) {
                    res.json("User Blocked For Login");
                } else {
                    function makeid(length) {
                        var result = "";
                        var characters =
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        var charactersLength = characters.length;
                        for (var i = 0; i < length; i++) {
                            result += characters.charAt(
                                Math.floor(Math.random() * charactersLength)
                            );
                        }
                        return result;
                    }

                    const text = makeid(40);
                    const crypto = require("crypto");
                    const secret = makeid(10);
                    const token = crypto
                        .createHash("sha256", secret)
                        .update(text)
                        .digest("hex");

                    // userTokan

                    db.query(
                        `UPDATE  users SET userTokan='${token}'  WHERE userMobile  = '${userMobile}'`,
                        (err, results) => {
                            if (results) {
                                res
                                    .status(200)
                                    .json({
                                        mess: "Successfully",
                                        token: token,
                                        data: result
                                    });
                            } else {
                                res.status(400).json(err);
                            }
                        }
                    );
                }
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/user/resetPassword", (req, res) => {
    const {
        userPassword,
        userMobile
    } = req.body;

    db.query(
        `UPDATE  users SET userPassword='${userPassword}'  WHERE userMobile  = '${userMobile}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/blankDetails", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);
                //console.log(id);

                const {
                    userId,
                    actualName,
                    ifseCode,
                    bankName,
                    accountNumber,
                    state,
                    city,
                    address,
                    mobileNumber,
                    email,
                    upiAccount,
                    userStatus,
                    userDelete,
                } = req.body;

                db.query(
                    `INSERT INTO bankdetails (userId, actualName, ifseCode, bankName, accountNumber, state, city, address, mobileNumber, email, upiAccount, userStatus, userDelete) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        id,
                        actualName,
                        ifseCode,
                        bankName,
                        accountNumber,
                        state,
                        city,
                        address,
                        mobileNumber,
                        email,
                        upiAccount,
                        userStatus,
                        userDelete,
                    ],
                    (err, result) => {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(200).json({
                                mess: "Successfully"
                            });
                        }
                    }
                );
            } else {}
        }
    );
});

// app.post('/addressDetails', requireSignin, (req, res) => {
//     const { id } = req.user
//     const { userId, fullName, mobile_number, pinCode, state, city, detaileAddress, status, deleteStatus } = req.body

//     db.query(`INSERT INTO useraddress (userId, fullName, mobileNumber, pinCode, state, city, detaileAddress, status, deleteStatus) VALUES (?,?,?,?,?,?,?,?,?)`,
//         [id, fullName, mobile_number, pinCode, state, city, detaileAddress, status, deleteStatus],
//         (err, result) => {
//             if (err) {
//                 res.status(400).json(err);
//             }
//             else {
//                 res.status(200).json({ mess: 'Successfully' });
//             }
//         }
//     )
// })



app.post("/submitrecharge", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    const {
        utr,
        transactionId
    } = req.body;
 
    if (utr.length > 22 || utr.length < 10) {
        res.status(400).json({
            error: "INVALID"
        });
    } else {

        db.query(
            `SELECT * FROM users WHERE userTokan='${tokens}'`,
            (err, resultw) => {
                if (resultw) {
                    var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                    const id = parseInt(resultArrays[0].userId);
                    db.query(
                        `SELECT * FROM deposit WHERE Utr='${utr}'`,
                        (err, result) => {
                            if (result.length === 1) {
                                res.status(400).json({
                                    error: "ALREADY"
                                });
                            } else {

                                ///
                                db.query(
                                    `SELECT Utr FROM deposit WHERE transaction_id='${transactionId}' && userId='${id}'`,
                                    (err, result) => {
                                        if (result[0].Utr == '') {

                                            db.query(
                                                `UPDATE  deposit SET Utr='${utr}' WHERE transaction_id='${transactionId}' && userId='${id}' `,
                                                (err, result) => {
                                                    if (result) {
                                                        res.status(200).json({
                                                            mess: "Success"
                                                        });
                                                    } else {
                                                        res.status(400).json(err);
                                                    }
                                                }
                                            );




                                        } else {

                                            res.status(400).json({
                                                error: "ALREADYFILLED"
                                            });



                                        }
                                    }
                                );




                                ///




                            }
                        }
                    );
                } else {}
            }
        );
    }
});

app.post("/showBankDetails", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);
                db.query(
                    `SELECT * FROM bankdetails WHERE userId='${id}' AND userDelete = 1`,
                    (err, result) => {
                        if (result.length === 0) {
                            res.json("Not add Bank Account ");
                        } else if (result.length >= 0) {
                            res.status(200).json({
                                mess: "Successfully",
                                data: result
                            });
                        } else {
                            res.status(400).json({
                                err: err,
                                mess: "mess"
                            });
                        }
                    }
                );
            } else {}
        }
    );
});




app.post("/Usercheck", (req, res) => {
    const {
        userName,
        userMobile,
        userNickName,
        userPassword,
        userReCode
    } = req.body

    if (userMobile.length === 10 && isNaN(userMobile) === false) {


        db.query(
            `SELECT * FROM users WHERE userMobile='${userMobile}'`,
            (err, resultw) => {
                if (resultw) {
                    if (resultw.length === 0) {


                        db.query(
                            `SELECT * FROM users WHERE userReCode='${userReCode}'`,
                            (err, resultw2) => {
                                if (resultw2) {
                                    if (resultw2.length === 0) {
                                        res.status(400).json({
                                            error: "InvalidRefCode"
                                        });
                                    } else {

                                        //
                                        res.status(200).json({
                                            otp: true,
                                            userName: userName,
                                            userMobile: userMobile,
                                            userNickName: userNickName,
                                            userPassword: userPassword,
                                            userReCode: userReCode
                                        });




                                        //    
                                    }

                                }
                            })




                    } else {
                        res.status(400).json({
                            error: "AlreadyRegAc"
                        });



                        //
                    }


                } else {


                }
            }
        );

    } else {
        if (isNaN(userMobile)) {
            res.status(400).json({
                error: "ONA"
            });
        } else if (userMobile.length < 10 || userMobile.length > 10) {
            res.status(400).json({
                error: "ECN"
            });
        }


    }

});

app.post("/chkbnk", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);

                db.query(
                    `SELECT * FROM bankdetails WHERE userId='${id}' AND userDelete = 1`,
                    (err, result) => {
                        if (result.length <= 2) {
                            res
                                .status(200)
                                .json({
                                    message: "CanProceedBank",
                                    Total: result.length
                                });
                        } else {
                            res
                                .status(400)
                                .json({
                                    message: "BankLimitExceed",
                                    Total: result.length
                                });
                        }
                    }
                );
            } else {}
        }
    );
});

// app.post('/showAddressDetails', requireSignin, (req, res) => {

//     const { id } = req.user

//     db.query(
//         `SELECT * FROM useraddress WHERE userId='${id}' AND deleteStatus=1`,
//         (err, result) => {
//             if (result.length === 0) {
//                 res.json('Not add Address ');
//             } else if (result.length === 1) {
//                 res.status(200).json({ mess: 'Successfully', data: result });
//                 // res.status(200).json(result);
//             } else {
//                 res.status(400).json(err);
//             }

//         }
//     )
// })

app.post("/showUser", (req, res) => {
    db.query(`SELECT * FROM users WHERE userDelete='1'`, (err, result) => {
        return res.json(result);
    });
});

// app.post('/remove/AddressDetails', requireSignin, (req, res) => {

//     // const { userId } = req.body
//     const { id } = req.user
//     db.query(
//         `UPDATE  useraddress SET deleteStatus='0' WHERE userId='${id}'`,
//         (err, result) => {
//             if (result) {
//                 res.status(200).json({ mess: 'Successfully' });
//             } else {
//                 res.status(400).json(err);
//             }

//         }
//     )
// })

app.post("/edit/AddDetails", (req, res) => {
    const {
        userId,
        fullName,
        mobile_number,
        pinCode,
        state,
        city,
        detaileAddress,
    } = req.body;

    db.query(
        `UPDATE  useraddress SET fullName='${fullName}', pinCode='${pinCode}', detaileAddress='${detaileAddress}',  state='${state}', city='${city}', mobileNumber='${mobile_number}'  WHERE userId='${userId}' AND deleteStatus='1'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/remove/BankDetails", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    const {
        userId
    } = req.body;

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);

                db.query(
                    `UPDATE  bankdetails SET userDelete='0' WHERE id='${userId}' && userId='${id}'`,
                    (err, result) => {
                        if (result) {
                            res.status(200).json({
                                mess: "Successfully"
                            });
                        } else {
                            res.status(400).json(err);
                        }
                    }
                );
            } else {}
        }
    );
});

app.post("/edit/BankDetails", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);

                const {
                    bkid,
                    userId,
                    actualName,
                    ifseCode,
                    bankName,
                    accountNumber,
                    state,
                    city,
                    address,
                    mobileNumber,
                    email,
                    upiAccount,
                } = req.body;
                // const { id } = req.user
                db.query(
                    `UPDATE  bankdetails SET actualName='${actualName}', ifseCode='${ifseCode}', bankName='${bankName}', accountNumber='${accountNumber}', state='${state}', city='${city}', address='${address}', mobileNumber='${mobileNumber}', email='${email}', upiAccount='${upiAccount}'  WHERE id='${bkid}' AND userId='${id}'`,
                    (err, result) => {
                        if (result) {
                            res.status(200).json({
                                mess: "Successfully"
                            });
                        } else {
                            res.status(400).json(err);
                        }
                    }
                );
            } else {}
        }
    );
});

app.post("/remove/UserDetails", (req, res) => {
    const {
        userId
    } = req.body;

    db.query(`DELETE FROM  users  WHERE userId='${userId}'`, (err, result) => {
        if (result) {
            res.status(200).json({
                mess: "Successfully"
            });
        } else {
            res.status(400).json(err);
        }
    });
});




app.post("/show/user/applybonus", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    const {
        amount
    } = req.body;

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);

                db.query(
                    `SELECT * FROM bonuswallet WHERE userId='${id}'`,
                    (err, resultws) => {
                        if (resultws) {

                            const bonusbalance = parseFloat(resultws[0].amount);

                            if (amount < 100 || amount > bonusbalance || isNaN(amount)) {

                                if (isNaN(amount)) {

                                    res.status(200).json({
                                        mess: "AmountNotValid"
                                    });
                                } else if (amount < 100) {
                                    res.status(200).json({
                                        mess: "AmountLessthan100"
                                    });

                                } else if (amount > bonusbalance) {
                                    res.status(200).json({
                                        mess: "AmountGreaterthanBonus"
                                    });

                                } else {

                                }

                                // res.status(200).json({ mess:"AmountError"});
                            } else {
                                //
                                db.query(
                                    `SELECT * FROM bonuswallet WHERE userId=${id}`,
                                    (err, result) => {
                                        var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));

                                        const AfterBonusAmount = +parseFloat(resultArrays[0]?.amount).toFixed(2) - +parseFloat(amount).toFixed(2);
                                        const TotalAppliedAmount = +parseFloat(resultArrays[0]?.appliedamount).toFixed(2) + +parseFloat(amount).toFixed(2);



                                        const last_updated_Date = new Date();
                                        const transactionId =
                                            resultArrays[0]?.userId +
                                            "_BONUS" +
                                            "_" +
                                            Math.floor(
                                                10000000 +
                                                Math.random() * 90000000
                                            );

                                        db.query(
                                            `SELECT * FROM wallet WHERE userId=${id}`,
                                            (err, result2) => {
                                                if (err) {} else {
                                                    var resultArrays2 = Object.values(JSON.parse(JSON.stringify(result2)));
                                                    const remainingAmount = +parseFloat(resultArrays2[0]?.closeBal).toFixed(2) + +parseFloat(amount).toFixed(2);
                                                    const transactionId =
                                                        resultArrays2[0]?.userId +
                                                        "_BONUS" +
                                                        "_" +
                                                        Math.floor(
                                                            10000000 +
                                                            Math.random() * 90000000
                                                        );
                                                    db.query(
                                                        `UPDATE  users SET userBalance='${remainingAmount}'   WHERE userId=${id}`,
                                                        (err, result) => {
                                                            if (err) {} else {}
                                                        }
                                                    );
                                                    db.query(
                                                        `SELECT * FROM users WHERE userId=${id}`,
                                                        async (err, result) => {
                                                            if (err) {} else {
                                                                var userDetais =
                                                                    Object.values(
                                                                        JSON.parse(
                                                                            JSON.stringify(result)
                                                                        )
                                                                    );
                                                                db.query(
                                                                    `INSERT INTO transaction (to_id, form_id, amount, previous_balance, current_balance, transaction_id , name, type,periodId ) VALUES (?,?,?,?,?,?,?,?,?)`,
                                                                    [
                                                                        userDetais[0]?.userId,
                                                                        "01",
                                                                        amount,
                                                                        resultArrays2[0]?.closeBal,
                                                                        remainingAmount,
                                                                        transactionId,
                                                                        userDetais[0]?.userName,
                                                                        "CR",
                                                                        "Bonus",
                                                                    ],
                                                                    (err, result) => {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else {
                                                                            //    console.log("ha");
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    );
                                                    db.query(
                                                        `UPDATE  wallet SET startBal='${resultArrays2[0]?.closeBal
                                            }', closeBal='${remainingAmount}'   WHERE userId=${id}`,
                                                        (err, result) => {
                                                            if (err) {} else {}
                                                        }
                                                    );


                                                    db.query(
                                                        `UPDATE  bonuswallet SET amount='${AfterBonusAmount}', appliedamount='${TotalAppliedAmount}'   WHERE userId=${id}`,
                                                        (err, result) => {
                                                            if (err) {} else {

                                                                db.query(
                                                                    `SELECT * FROM bonuswallet WHERE userId='${id}'`,
                                                                    (err, resultws) => {
                                                                        if (resultws) {

                                                                            const bonusbalance = parseFloat(resultws[0].amount);
                                                                            const level1amount = parseFloat(resultws[0].level1amount);
                                                                            const level2amount = parseFloat(resultws[0].level2amount);



                                                                            res.status(200).json({
                                                                                mess: "okk",
                                                                                lvl1amt: level1amount,
                                                                                lvl2amt: level2amount,
                                                                                bonusbal: bonusbalance
                                                                            });

                                                                        } else {}
                                                                    })
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                );




                                //


                            }

                            //console.log("ft :"+fathcount+" | gt :"+gfcount+ "ftlv1 :"+level1amount+" | gtlvl2 :"+level2amount+ " | bonusbbal : "+bonusbalance);
                            //res.status(200).json({ lvl1p: fathcount ,lvl2p :gfcount ,lvl1amt :level1amount,lvl2amt :level2amount,bonusbal :bonusbalance});

                        } else {}
                    })




            } else {}
        })
});



app.post("/show/user/Bonus", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);
                const codes = resultArrays[0].userReCode;

                db.query(
                    `SELECT * FROM users WHERE fatherId='${id}'`,
                    (err, resultw) => {
                        if (resultw) {

                            var fathcount = resultw.length;




                            db.query(
                                `SELECT * FROM users WHERE gfId='${id}'`,
                                (err, resultw) => {
                                    if (resultw) {
                                        var gfcount = resultw.length;




                                        db.query(
                                            `SELECT * FROM bonuswallet WHERE userId='${id}'`,
                                            (err, resultws) => {
                                                if (resultws) {

                                                    const bonusbalance = (parseFloat(resultws[0].amount)).toFixed(2);
                                                    const level1amount = parseFloat(resultws[0].level1amount);
                                                    const level2amount = parseFloat(resultws[0].level2amount);


                                                    //console.log("ft :"+fathcount+" | gt :"+gfcount+ "ftlv1 :"+level1amount+" | gtlvl2 :"+level2amount+ " | bonusbbal : "+bonusbalance);
                                                    res.status(200).json({
                                                        lvl1p: fathcount,
                                                        lvl2p: gfcount,
                                                        lvl1amt: level1amount,
                                                        lvl2amt: level2amount,
                                                        bonusbal: bonusbalance,
                                                        code: codes
                                                    });

                                                } else {}
                                            })




                                    } else {}
                                })
                        } else {}
                    })




            } else {}
        }
    );
});


//Surbhi's work  
app.post("/aboutpage", (req, res) => {
    const {
        aboutContent
    } = req.body;
    db.query(
        `INSERT INTO aboutpage (aboutContent) VALUES (?)`,
        [aboutContent],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.get("/show/about", (req, res) => {
    db.query(`SELECT * FROM aboutpage`, (err, result) => {
        return res.json(result);
    });
});

app.post("/update/about/page", (req, res) => {
    const {
        pageId,
        aboutContent
    } = req.body;

    db.query(
        `UPDATE  aboutpage SET aboutContent='${aboutContent}' WHERE Id='${pageId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/termspage", (req, res) => {
    const {
        termsContent
    } = req.body;
    db.query(
        `INSERT INTO termspage (termsContent) VALUES (?)`,
        [termsContent],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.get("/show/terms", (req, res) => {
    db.query(`SELECT * FROM termspage`, (err, result) => {
        return res.json(result);
    });
});

app.post("/update/terms/page", (req, res) => {
    const {
        termsId,
        termsContent
    } = req.body;

    db.query(
        `UPDATE  termspage SET termsContent='${termsContent}' WHERE Id='${termsId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/privacypage", (req, res) => {
    const {
        privacyContent
    } = req.body;
    db.query(
        `INSERT INTO privacypage (privacyContent) VALUES (?)`,
        [privacyContent],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.get("/show/privacy", (req, res) => {
    db.query(`SELECT * FROM privacypage`, (err, result) => {
        return res.json(result);
    });
});

app.post("/update/privacy/page", (req, res) => {
    const {
        privacyId,
        privacyContent
    } = req.body;

    db.query(
        `UPDATE  privacypage SET privacyContent='${privacyContent}' WHERE Id='${privacyId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/rolepage", (req, res) => {
    const {
        roleContent
    } = req.body;
    db.query(
        `INSERT INTO rolepage (roleContent) VALUES (?)`,
        [roleContent],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.get("/show/role", (req, res) => {
    db.query(`SELECT * FROM rolepage`, (err, result) => {
        return res.json(result);
    });
});
app.get("/show/rcoption", (req, res) => {
    db.query(`SELECT id,channelname FROM channelrc WHERE Status=0`, (err, result) => {
        return res.json(result);
    });
});
app.get("/show/wdoption", (req, res) => {
    db.query(`SELECT id,channelname FROM channelwd WHERE Status=1`, (err, result) => {
        return res.json(result);
    });
});


app.post("/show/rcoptionupi", (req, res) => {

    const tokens = req.headers.authorization.split(" ")[1];
 
    const {
        id,
        amount
    } = req.body;

    if (amount > 20000 || amount < 100 || isNaN(amount) === true) {
        if (amount > 20000) {
            res.status(400).json({
                mess: "Max"
            });
        }
        if (amount < 100) {
            res.status(400).json({
                mess: "Min"
            });
        }
        if (isNaN(amount) === true) {
            res.status(400).json({
                mess: "invalidAmount"
            });
        }
    } else {

        db.query(
            `SELECT * FROM users WHERE userTokan='${tokens}'`,
            (err, resultw) => {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const idreal = parseInt(resultArrays[0].userId);
                const ctsmp = Date.now();

                const transactionId = idreal + "_RECHARGE_" + ctsmp;
                db.query(`SELECT channelname,upi,Status FROM channelrc WHERE id='${id}'`, (err, resulto) => {


                    if (resulto) {
                        db.query(
                            `INSERT INTO deposit (userId, transaction_id, amount, status,Upi ) VALUES (?,?,?,?,?)`,
                            [
                                idreal,
                                transactionId,
                                amount, 0, resulto[0].upi
                            ],
                            (err, result) => {
                                res.status(200).json({
                                    channelname: resulto[0].channelname,
                                    upi: resulto[0].upi,
                                    transactionId: transactionId
                                });

                            });
                    } else {


                    }
                });




            })
    }


})



app.post("/update/role/page", (req, res) => {
    const {
        roleId,
        roleContent
    } = req.body;

    db.query(
        `UPDATE  rolepage SET roleContent='${roleContent}' WHERE Id='${roleId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );


});

app.post("/promo", (req, res) => {
    const {
        promoCode,
        promoDes,
        validity,
        promoStatus
    } = req.body;
    db.query(
        `INSERT INTO promo (promoCode, promoDes, validity, promoStatus) VALUES (?,?,?,?)`,
        [promoCode, promoDes, validity, promoStatus],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.post("/show/admin/Promo", (req, res) => {
    db.query(`SELECT * FROM promo`, (err, result) => {
        return res.json(result);
    });
});

app.post("/show/admin/Bandhantoken", (req, res) => {
    db.query(`SELECT * FROM promo`, (err, result) => {
        return res.json(result);
    });
});


app.post("/edit/promotion", (req, res) => {
    const {
        promoId,
        promoCode,
        promoDes,
        validity,
        promoStatus
    } = req.body;
    db.query(
        `UPDATE  promo SET promoCode='${promoCode}', promoDes='${promoDes}', validity='${validity}', promoStatus='${promoStatus}' WHERE Id='${promoId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/remove/promotion", (req, res) => {
    const {
        Id
    } = req.body;
    db.query(`DELETE FROM  promo WHERE Id='${Id}'`, (err, result) => {
        if (result) {
            res.status(200).json({
                mess: "Successfully"
            });
        } else {
            res.status(400).json(err);
        }
    });
});

app.post("/settings", (req, res) => {

    const {
        name,
        upi
    } = req.body;
    if (name == '' && upi == '') {
        res.status(400).json({
            mess: "NE"
        })
    } else {
        db.query(
            `INSERT INTO channelrc (channelname, upi, totalrc, Status) VALUES (?,?,?,?)`,
            [name, upi, 0, 0],
            (err, result) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json({
                        mess: "Successfully"
                    });
                }
            }
        );
    }
});

app.post("/settingswd", (req, res) => {

    const {
        name,
        limit,
        times
    } = req.body;
    if (name == '' && limit == '' && times == '') {
        res.status(400).json({
            mess: "NE"
        })
    } else {
        db.query(
            `INSERT INTO channelwd (channelname, wdlimit, wdtimes, Status) VALUES (?,?,?,?)`,
            [name, limit, times, 1],
            (err, result) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json({
                        mess: "Successfully"
                    });
                }
            }
        );
    }
});


app.post("/show/admin/setting", (req, res) => {
    db.query(`SELECT * FROM channelrc`, (err, result) => {
        return res.json(result);
    });
});
app.post("/show/admin/settingwd", (req, res) => {
    db.query(`SELECT * FROM channelwd`, (err, result) => {
        return res.json(result);
    });
});

app.post("/edit/settings", (req, res) => {
    const {
        id,
        name,
        upi
    } = req.body;
    db.query(
        `UPDATE settings SET channelname='${name}', upi='${upi}' WHERE id='${id}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});
app.post("/edit/settingswd", (req, res) => {
    const {
        id,
        name,
        times,
        limit
    } = req.body;
    db.query(
        `UPDATE channelwd SET channelname='${name}', wdtimes='${times}', wdlimit='${limit}' WHERE id='${id}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/remove/settings", (req, res) => {
    const {
        settingsId
    } = req.body;
    db.query(`DELETE FROM  settings WHERE Id='${settingsId}'`, (err, result) => {
        if (result) {
            res.status(200).json({
                mess: "Successfully"
            });
        } else {
            res.status(400).json(err);
        }
    });
});

// app.post('/orders', (req, res) => {

//     const { userId, userName, time, Period, cardtype, amount } = req.body;
//     db.query(`INSERT INTO orders (userId, userName, time, Period, cardtype, amount) VALUES (?,?,?,?,?,?)`,
//         [userId, userName, time, Period, cardtype, amount],
//         (err, result) => {
//             if (err) {
//                 res.status(400).json(err);
//             }
//             else {
//                 res.status(200).json('Successfully');
//             }
//         }
//     )
// })

app.post("/showOrder", (req, res) => {
    db.query(`SELECT * FROM orders`, (err, result) => {
        return res.json(result);
    });
});

app.post("/remove/admin/order", (req, res) => {
    const {
        Id
    } = req.body;
    db.query(`DELETE FROM  orders WHERE Id='${Id}'`, (err, result) => {
        if (result) {
            res.status(200).json({
                mess: "Successfully"
            });
        } else {
            res.status(400).json(err);
        }
    });
});

app.post("/result", (req, res) => {
    const {
        record,
        result
    } = req.body;
    db.query(
        `INSERT INTO result (record, result) VALUES (?,?)`,
        [record, result],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.post("/showResult", (req, res) => {
    db.query(`SELECT * FROM result`, (err, result) => {
        return res.json(result);
    });
});

app.post("/updateResult", (req, res) => {
    const {
        resultID,
        record,
        updateResult
    } = req.body;

    db.query(
        `UPDATE result SET record= '${record}', result='${updateResult}' WHERE Id='${resultID}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/rules", (req, res) => {
    const {
        rules
    } = req.body;
    db.query(`INSERT INTO rules (rules) VALUES (?)`, [rules], (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json("Successfully");
        }
    });
});

app.get("/showRules", (req, res) => {
    db.query(`SELECT * FROM notice WHERE Id='1'`, (err, result) => {
        return res.json(result);
    });
});
app.get("/Notification", (req, res) => {
    db.query(`SELECT * FROM notice WHERE Id='1'`, (err, result) => {
        return res.json(result);
    });
});
app.post("/update/rule/page", (req, res) => {
    const {
        rules
    } = req.body;

    db.query(
        `UPDATE  notice SET notice='${rules}' WHERE Id ='1'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/takec", (req, res) => {
    const {
        takec,
        tstatus
    } = req.body;
    db.query(
        `INSERT INTO takec (takec, tstatus) VALUES (?,?)`,
        [takec, tstatus],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.post("/add/adminPayment", (req, res) => {
    const {
        paymentHeading,
        paymentContent,
        paymentImage,
        status,
        dateTime,
        showImga,
    } = req.body;
    db.query(
        `INSERT INTO payment (paymentHeading, paymentContent, paymentImage, status, dateTime,showImga) VALUES (?,?,?,?,?,?)`,
        [paymentHeading, paymentContent, paymentImage, status, dateTime, showImga],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

// app.post('/show/admin/Payment', (req, res) => {
//     db.query(
//         `SELECT * FROM payment`,
//         (err, result) => {
//             return res.json(result);
//         }
//     )
// })

app.post("/remove/admin/paymentDetails", (req, res) => {
    const {
        Id
    } = req.body;
    db.query(`DELETE FROM  payment WHERE Id='${Id}'`, (err, result) => {
        if (result) {
            res.status(200).json({
                mess: "Successfully"
            });
        } else {
            res.status(400).json(err);
        }
    });
});

app.post("/edit/admin/paymentDetails", (req, res) => {
    const {
        Id,
        paymentHeading,
        paymentContent,
        paymentImage,
        status,
        showImga
    } =
    req.body;
    db.query(
        `UPDATE  payment SET paymentHeading='${paymentHeading}', paymentContent='${paymentContent}', paymentImage='${paymentImage}', status='${status}',showImga='${showImga}' WHERE Id='${Id}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/user/tickets", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];

    db.query(
        `SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, resultw) => {
            if (resultw) {
                var resultArrays = Object.values(JSON.parse(JSON.stringify(resultw)));
                const id = parseInt(resultArrays[0].userId);

                const {
                    userId,
                    name,
                    email,
                    phoneNo,
                    subject,
                    message,
                    status
                } =
                req.body;
                db.query(
                    `INSERT INTO tickets (userId, name, email, phone, subject, message, status) VALUES (?,?,?,?,?,?,?)`,
                    [id, name, email, phoneNo, subject, message, status],
                    (err, result) => {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(200).json("Successfully");
                        }
                    }
                );
            } else {}
        }
    );
});

app.post("/show/admin/Ticket", (req, res) => {
    db.query(`SELECT * FROM tickets `, (err, result) => {
        return res.json(result);
    });
});

app.post("/show/user/Ticket", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];

    if (tokens !== null && tokens !== undefined) {
        db.query(
            `SELECT * FROM users WHERE userTokan = '${tokens}'`,
            (err, result) => {
                if (result?.length == 0) {
                    return res.status(400).json({
                        mess: "user not Found"
                    });
                } else {
                    var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));
                    const id = parseInt(resultArrays[0].userId);

                    db.query(
                        `SELECT * FROM tickets WHERE userId='${id}'`,
                        (err, result) => {
                            return res.json(result);
                        }
                    );
                }
            }
        );
    }
});

app.post("/remove/admin/userTickets", (req, res) => {
    const {
        tid
    } = req.body;

    db.query(`DELETE FROM  tickets  WHERE Id='${tid}'`, (err, result) => {
        if (result) {
            res.status(200).json({
                mess: "Successfully"
            });
        } else {
            res.status(400).json(err);
        }
    });
});

app.post("/edit/admin/ticketDetails", (req, res) => {
    const {
        user,
        ticketId,
        name,
        email,
        phone,
        subject,
        message,
        status
    } =
    req.body;
    db.query(
        `UPDATE  tickets SET name='${name}', email='${email}', phone='${phone}', status='${status}', subject='${subject}', message='${message}'  WHERE Id='${ticketId}' AND userId='${user}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});

app.post("/wallet", (req, res) => {
    const {
        userId,
        startBal,
        closeBal,
        dateTime
    } = req.body;
    db.query(
        `INSERT INTO wallet (userId, startBal, closeBal, dateTime) VALUES (?,?,?,?)`,
        [userId, startBal, closeBal, dateTime],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});
app.post("/gamesettings", (req, res) => {
    const {
        A,
        Lower,
        O
    } = req.body;
    db.query(
        `INSERT INTO gamesettings (A, Lower, O) VALUES (?,?,?)`,
        [A, Lower, O],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.post("/admin", (req, res) => {
    const {
        userName,
        password,
        status
    } = req.body;
    db.query(
        `INSERT INTO admin (userName, password, status) VALUES (?,?,?)`,
        [userName, password, status],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successfully");
            }
        }
    );
});

app.post("/edit/adminUser", (req, res) => {
    const {
        userId,
        userName,
        userMobile,
        userNickName,
        userPassword,
        userReCode,
        userBalance,
    } = req.body;
    db.query(
        `UPDATE  users SET userName='${userName}', userMobile='${userMobile}', userNickName='${userNickName}', userPassword='${userPassword}', userReCode='${userReCode}', 
        userBalance='${userBalance}' WHERE userId='${userId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({
                    mess: "Successfully"
                });
            } else {
                res.status(400).json(err);
            }
        }
    );
});
app.post("/showUserAdmin", (req, res) => {
    try {
        const tokens = req.headers.authorization.split(" ")[1];

        if (tokens !== null && tokens !== undefined) {
            db.query(
                `SELECT * FROM users WHERE userTokan = '${tokens}'`,
                (err, result) => {
                    if (result?.length == 0) {
                        return res.status(400).json({
                            mess: "user not Found"
                        });
                    } else {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                        delete resultArray[0].userPassword;
                        if (resultArray[0]?.userTokan !== tokens) {
                            return res
                                .status(401)
                                .json({
                                    message: "Authorization required"
                                });
                        } else {
                            return res.json(resultArray);
                        }
                    }
                }
            );
        } else {
            res.json("");
        }
    } catch (error) {
        return res.status(400).json(error);
    }
});

app.post("/showAddressAdmin", (req, res) => {
    const {
        userId
    } = req.body;

    db.query(
        `SELECT * FROM useraddress WHERE userId = ${userId} AND deleteStatus = '1'`,
        (err, result) => {
            return res.json(result);
        }
    );
});

app.post("/showBankAdmin", (req, res) => {
    const {
        userId
    } = req.body;

    db.query(
        `SELECT * FROM bankdetails WHERE userId = ${userId} AND userDelete ='1'`,
        (err, result) => {
            return res.json(result);
        }
    );
});

app.post("/BonusHistory", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    db.query(`SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, result) => {
            if (result) {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                var id = parseInt(resultArray[0]?.userId);
                db.query(`SELECT * FROM wintable WHERE fathid='${id}' OR gfid='${id}'`, (err, result) => {
                    if (result) {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                        const lists =
                            resultArray?.filter((data) => {
                                return (
                                    data?.fathid == id
                                );
                            });
                        const lists2 =
                            resultArray?.filter((data) => {
                                return (
                                    data?.gfid == id
                                );
                            });
                        var holder = {};
                        lists.forEach(function(d) {
                            if (holder.hasOwnProperty(d.periodId)) {
                                holder[d.periodId] =
                                    holder[d.periodId] +
                                    parseFloat(d.fathidbonus);


                            } else {
                                holder[d.periodId] = parseFloat(
                                    d.fathidbonus);
                            }
                        });
                        var holder2 = {};
                        lists2.forEach(function(d) {
                            if (holder2.hasOwnProperty(d.periodId)) {
                                holder2[d.periodId] =
                                    holder2[d.periodId] +
                                    parseFloat(d.gfidbonus);


                            } else {
                                holder2[d.periodId] = parseFloat(
                                    d.gfidbonus);

                            }
                        });
                        var obj = [];
                        for (var prop in holder) {
                            obj.push({
                                periodId: prop,
                                fathidbonus: holder[prop],
                            });
                        }
                        var obj2 = [];
                        for (var prop in holder2) {
                            obj2.push({
                                periodId: prop,
                                gfidbonus: holder2[prop],
                            });
                        }
                        var reducer = function(obj1, obj2) {
                            return obj1.reduce((i, j) => {
                                var temp = obj2.filter(o => o.periodId == j.periodId);
                                i.push(temp == [] ? j : Object.assign({}, j, temp[0]));
                                return i;
                            }, []);
                        };

                        function removeDuplicates(originalArray, prop) {
                            var newArray = [];
                            var lookupObject = {};

                            for (var i in originalArray) {
                                lookupObject[originalArray[i][prop]] = originalArray[i];
                            }

                            for (i in lookupObject) {
                                newArray.push(lookupObject[i]);
                            }
                            return newArray;
                        }
                        var v1 = reducer(obj, obj2);
                        var v2 = reducer(obj2, obj);
                        const newarray = removeDuplicates([...v1, ...v2], "periodId");
                        return res.json(newarray);

                    } else {
                        console.log(err);
                    }
                });
            }
        });
});




app.post("/BonusApplyHistory", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    db.query(`SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, result) => {
            if (result) {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                var id = parseInt(resultArray[0]?.userId);
                db.query(`SELECT * FROM transaction WHERE periodId="Bonus" AND to_id='${id}'`, (err, result) => {
                    if (result) {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                        var id = resultArray[0]?.userId;

                        return res.json(result);

                    } else {
                        console.log(err);
                    }
                });

            } else {
                console.log(err);
            }
        });
});



app.post("/RechargeHistory", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    db.query(`SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, result) => {
            if (result) {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                var id = parseInt(resultArray[0]?.userId);
                db.query(`SELECT * FROM deposit WHERE userId='${id}'`, (err, result) => {
                    if (result) {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));


                        return res.json(result);

                    } else {
                        console.log(err);
                    }
                });

            } else {
                console.log(err);
            }
        });
});

app.post("/WithdrawHistory", (req, res) => {
    const tokens = req.headers.authorization.split(" ")[1];
    db.query(`SELECT * FROM users WHERE userTokan='${tokens}'`,
        (err, result) => {
            if (result) {
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                var id = parseInt(resultArray[0]?.userId);
                db.query(`SELECT * FROM withdrawal WHERE userId='${id}'`, (err, result) => {
                    if (result) {
                        var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                        return res.json(resultArray);

                    } else {
                        console.log(err);
                    }
                });

            } else {
                console.log(err);
            }
        });
});


app.post("/history", (req, res) => {
    const {
        userId
    } = req.body;
    db.query(`SELECT * FROM users WHERE userTokan='${userId}'`, (err, result) => {
        if (result) {
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            var id = resultArray[0]?.userId;
            db.query(`SELECT * FROM wintable WHERE userId = ${id}`, (err, result) => {
                return res.json(result);
            });
        } else {
            console.log(err);
        }
    });
});



app.post("/userblock", (req, res) => {
    const {
        bhaiya,
        b
    } = req.body;

    db.query(
        `UPDATE  users SET userStatus='${bhaiya}',userTokan=''  WHERE userId  = '${b}' `,
        (err, result) => {
            if (err) {
                res.status(400).json({
                    mess: "fail"
                });
            } else {
                res.status(200).json({
                    mess: "success"
                });
            }
        }
    );
});

app.post("/wdapprove", (req, res) => {
    const {
        a,
        b,
        requestPayment
    } = req.body;

    db.query(
        `UPDATE  withdrawal SET status='1' WHERE userId  = '${b}' AND id  = '${a}' `,
        (err, result) => {
            if (err) {
                res.status(400).json({
                    mess: "fail"
                });
            } else {



   // Update total withdrawal
   db.query('SELECT * FROM users WHERE userId=?', [b], (err, totalwdResult) => {
    if (err) {
        console.error("Error fetching wallet:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    else{
    
    const totalAmountadd = parseFloat(parseInt(totalwdResult[0].totalwd||0)) + parseFloat(requestPayment);
    db.query(
        'UPDATE users SET totalwd=? WHERE userId=?',
        [totalAmountadd, b],
        (updateErr, result) => {
            if (updateErr) {
                console.error("Error updating total recharge:", updateErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }
           }
    );

   }
});

        res.status(200).json({
                    mess: "success"
                });
            }
        }
    );
});
app.post("/rcapprove", (req, res) => {
    const { a, b ,payment } = req.body;

    // Update deposit status
    db.query(
        `UPDATE deposit SET status='1' WHERE userId=? AND id=?`,
        [b, a],
        (err, depositUpdateResult) => {
            if (err) {
                console.error("Error updating deposit status:", err);
                res.status(400).json({ mess: "Failed to update deposit status" });
            } else {
                // Proceed with other operations
                db.query(`SELECT * FROM users WHERE userId=?`, [b], (err, userResult) => {
                    if (err) {
                        console.error("Error fetching user:", err);
                        res.status(500).json({ error: "Internal Server Error" });
                    } else {
                        const userData = userResult[0];
                         
                        if (!userData) {
                            res.status(400).json({ mess: "User Not Found" });
                        } else {
                            db.query(`SELECT * FROM wallet WHERE userId=?`, [b], (err, walletResult) => {
                                if (err) {
                                    console.error("Error fetching wallet:", err);
                                    res.status(500).json({ error: "Internal Server Error" });
                                } else {
                                    const walletData = walletResult[0];
                                    const totalAmount = parseFloat(walletData.closeBal) + parseFloat(payment);
                                    const ctsmp = Date.now();
                                    const transaction_id = b + "_RECHARGE_" + ctsmp;
                                    // Update user balance
                                    db.query(
                                        `UPDATE users SET userBalance=? WHERE userId=?`,
                                        [totalAmount, b],
                                        (err, updateUserResult) => {
                                            if (err) {
                                                console.error("Error updating user balance:", err);
                                                res.status(500).json({ error: "Internal Server Error" });
                                            } else {
                                                // Insert transaction record
                                                db.query(
                                                    `INSERT INTO transaction (to_id, form_id, amount, previous_balance, current_balance, transaction_id, name, type, periodId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                    [
                                                        b,
                                                        "01",
                                                        parseFloat(payment),
                                                        walletData.closeBal,
                                                        totalAmount,
                                                        transaction_id,
                                                        userData.userName,
                                                        "CR",
                                                        "recharge",
                                                    ],
                                                    (err, insertTransactionResult) => {
                                                        if (err) {
                                                            console.error("Error inserting transaction:", err);
                                                            res.status(500).json({ error: "Internal Server Error" });
                                                        } else {
                                                            // Update wallet balance
                                                            db.query(
                                                                `UPDATE wallet SET startBal=?, closeBal=? WHERE userId=?`,
                                                                [walletData.closeBal, totalAmount, b],
                                                                (err, updateWalletResult) => {
                                                                    if (err) {
                                                                        console.error("Error updating wallet balance:", err);
                                                                        res.status(500).json({ error: "Internal Server Error" });
                                                                    } else {
                                                                        // Update total recharge
                                                                        db.query('SELECT * FROM users WHERE userId=?', [b], (err, totalrcResult) => {
                                                                            if (err) {
                                                                                console.error("Error fetching wallet:", err);
                                                                                return res.status(500).json({ error: "Internal Server Error" });
                                                                            }

                                                                            console.log(totalrcResult);
                                                                            const totalAmountadd = parseFloat(parseInt(totalrcResult[0].totalrc||0)) + parseFloat(payment);
                                                                            db.query(
                                                                                'UPDATE users SET totalrc=? WHERE userId=?',
                                                                                [totalAmountadd, b],
                                                                                (updateErr, result) => {
                                                                                    if (updateErr) {
                                                                                        console.error("Error updating total recharge:", updateErr);
                                                                                        return res.status(500).json({ error: "Internal Server Error" });
                                                                                    }
                                                                                    // Handle successful update if needed
                                                                                    res.status(200).json({ mess: "Successfully" });
                                                                                }
                                                                            );
                                                                        });
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            });
                        }
                    }
                });
            }
        }
    );
});













 
 





app.post("/rcreject", (req, res) => {
    const {
        a,
        b
    } = req.body;

    db.query(
        `UPDATE  deposit SET status='2' WHERE userId  = '${b}' AND Id  = '${a}' `,
        (err, result) => {
            if (err) {
                res.status(400).json({
                    mess: "fail"
                });
            } else {
                res.status(200).json({
                    mess: "success"
                });
            }
        }
    );
});

















app.post("/wdreject", (req, res) => {
    const {
        a,
        b,
        c
    } = req.body;
    
    db.query(`SELECT * FROM wallet WHERE userId='${b}'`,
        (err, result) => {
            if (result) {
                console.log(result)
                var resultArrays = Object.values(JSON.parse(JSON.stringify(result)));
                var remainingAmount = (parseFloat(resultArrays[0].closeBal) + parseFloat(c)).toFixed(2);
                console.log(remainingAmount)
                db.query(
                    `UPDATE  wallet SET startBal='${resultArrays[0]?.closeBal
                }', closeBal='${remainingAmount}'   WHERE userId=${b}`,
                    (err, result) => {
                        if (err) {} else {}
                    }
                );


                db.query(
                    `UPDATE  users SET userBalance='${remainingAmount}'   WHERE userId=${b}`,
                    (err, result) => {
                        if (err) {} else {

                           
                         
                db.query(
                    `UPDATE  withdrawal SET status='2' WHERE userId  = '${b}' AND id  = '${a}' `,
                    (err, result) => {
                        if (err) {
                            res.status(400).json({
                                mess: "fail"
                            });
                        } else {

                            db.query('SELECT * FROM users WHERE userId=?', [b], (err, totalwdResult) => {
                                if (err) {
                                    console.error("Error fetching wallet:", err);
                                    return res.status(500).json({ error: "Internal Server Error" });
                                }
                                
                                else{
                            const totalAmountadd = parseFloat(parseInt(totalwdResult[0].totalwd||0)) - parseFloat(c);
                            db.query(
                                'UPDATE users SET totalwd=? WHERE userId=?',
                                [totalAmountadd, b],
                                (updateErr, result) => {
                                    if (updateErr) {
                                        console.error("Error updating total recharge:", updateErr);
                                        return res.status(500).json({ error: "Internal Server Error" });
                                    }
                                    else{
                        
                                          // console.log(result);
                                          res.status(200).json({
                                            mess: "success"
                                        });
                                    }
                                   }
                            );
                        
                           
                        }
                    
                    }
                );

                        }})
            }
        }
    );


            } else {
                res.status(400).json({
                    mess: "fail"
                });
            }
        }
    );

});


app.post("/channelSet", (req, res) => {
    const {
        bhaiya,
        b
    } = req.body;

    db.query(
        `UPDATE  channelrc SET Status='${bhaiya}'  WHERE id  = '${b}' `,
        (err, result) => {
            if (err) {
                res.status(400).json({
                    mess: "fail"
                });
            } else {
                res.status(200).json({
                    mess: "success"
                });
            }
        }
    );
});
app.post("/channelSetwd", (req, res) => {
    const {
        bhaiya,
        b
    } = req.body;

    db.query(
        `UPDATE  channelwd SET Status='${bhaiya}'  WHERE id  = '${b}' `,
        (err, result) => {
            if (err) {
                res.status(400).json({
                    mess: "fail"
                });
            } else {
                res.status(200).json({
                    mess: "success"
                });
            }
        }
    );
});
app.post("/adminLogin", (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (email === "" || password === "") {
        res.send("empty feild ");
    } else if (email === "admin123@gmail.com" && password === "admin123") {
        res.send("Successfully");
    } else res.send("user not found");
});

app.get("/updatequery", (req, res) => {
    db.query(`SELECT * from users WHERE userId=${32}`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            return res.json(result);
        }
    });
});

server.listen(5000, () => console.log("server is run on 5000"));

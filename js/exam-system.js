$("#questions-list").html("");
$("#answer-sheets").html("");
$("#number1").text(datas.length)
$("#number2").text(datas.length)
$("#number3").text(datas.length)
datas = shuffle(datas);
var correctly = 0;
var errornum = 0;
console.log($('#questions-list').html)
for(let i = 0; i < datas.length; i++) {
    if(datas[i].type == "单选题") {
        str_html = `<li id="qu_0_${i}">\
                        <div class="test_content_nr_tt">\
                            <i>${i + 1}、${datas[i].type}</i><span>(1分)</span>\
                            <font>${datas[i].title}</font><b\
                                class="icon iconfont">&#xe881;</b>\
                        </div>\
                        <div class="test_content_nr_main">\
                            <ul>\
                                <li class="option">\
                                    <input type="radio" class="radioOrCheck" name="answer${i + 1}"\
                                        id="0_answer_${i + 1}_option_1" />\
                                    <label for="0_answer_${i + 1}_option_1">\
                                        A.\
                                        <p class="ue" style="display: inline;">${datas[i].answers[0]}</p>\
                                    </label>\
                                </li>\
                                <li class="option">\
                                    <input type="radio" class="radioOrCheck" name="answer${i + 1}"\
                                        id="0_answer_${i + 1}_option_2" />\
                                    <label for="0_answer_${i + 1}_option_2">\
                                        B.\
                                        <p class="ue" style="display: inline;">${datas[i].answers[1]}</p>\
                                    </label>\
                                </li>\
                                <li class="option">\
                                    <input type="radio" class="radioOrCheck" name="answer${i + 1}"\
                                        id="0_answer_${i + 1}_option_3" />\
                                    <label for="0_answer_${i + 1}_option_3">\
                                        C.\
                                        <p class="ue" style="display: inline;">${datas[i].answers[2]}</p>\
                                    </label>\
                                </li>\
                                <li class="option">\
                                    <input type="radio" class="radioOrCheck" name="answer${i + 1}"\
                                        id="0_answer_${i + 1}_option_4" />\
                                    <label for="0_answer_${i + 1}_option_4">\
                                        D.\
                                        <p class="ue" style="display: inline;">${datas[i].answers[3]}</p>\
                                    </label>\
                                </li>\
                                <li class="user_answer_${i + 1}" style="display: none;">\
                                    <label>\
                                        <div class="0_correct_answer_${i + 1}">正确答案：${datas[i].answer}</div>\
                                        <div class="0_user_answer_${i + 1}">你的答案：<span id="0_user_answer_${i + 1}">D</span></div>\
                                    </label>\
                                </li>\
                            </ul>\
                        </div>\
                    </li>`
    } else {
        str_html = `<li id="qu_0_${i}">\
                        <div class="test_content_nr_tt">\
                            <i>${i + 1}、${datas[i].type}</i><span>(1分)</span>\
                            <font>${datas[i].title}</font><b\
                                class="icon iconfont">&#xe881;</b>\
                        </div>\
                        <div class="test_content_nr_main">\
                            <ul>\
                                <li class="option">\
                                    <input type="radio" class="radioOrCheck" name="answer${i + 1}"\
                                        id="0_answer_${i + 1}_option_1" />\
                                    <label for="0_answer_${i + 1}_option_1">\
                                        A.\
                                        <p class="ue" style="display: inline;">正确</p>\
                                    </label>\
                                </li>\
                                <li class="option">\
                                    <input type="radio" class="radioOrCheck" name="answer${i + 1}"\
                                        id="0_answer_${i + 1}_option_2" />\
                                    <label for="0_answer_${i + 1}_option_2">\
                                        B.\
                                        <p class="ue" style="display: inline;">错误</p>\
                                    </label>\
                                </li>\
                                <li class="user_answer_${i + 1}" style="display: none;">\
                                    <label>\
                                        <div class="0_correct_answer_${i + 1}">正确答案：${datas[i].answer}</div>\
                                        <div class="0_user_answer_${i + 1}">你的答案：<span id="0_user_answer_${i + 1}">D</span></div>\
                                    </label>\
                                </li>\
                            </ul>\
                        </div>\
                    </li>`
    }


    $("#questions-list").append(str_html)
    $("#answer-sheets").append(`<li><a href="#qu_0_${i}">${i + 1}</a></li>`)
}


$(function () {
    $('li.option label').click(function () {
        debugger;
        var examId = $(this).closest('.test_content_nr_main').closest('li').attr('id'); // 得到题目ID
        var optionID = $(this).attr('for'); // 得到选项ID
        
        var cardLi = $('a[href=#' + examId + ']'); // 根据题目ID找到对应答题卡
        // 设置已答题
        if (!cardLi.hasClass('hasBeenAnswer')) {
            cardLi.addClass('hasBeenAnswer');
        }

        var examNum = optionID.split("_")[2];
        var optionNum = optionID.split("_")[4];

        // console.log(examId, optionID, examNum, optionNum)
        if(datas[examNum-1].type == "单选题") {
            let answer_dict = ["A", "B", "C", "D"]
            $(`.user_answer_${examNum}`).css("display","block");
            $(`#0_user_answer_${examNum}`).text(answer_dict[optionNum-1]);
            $(`#qu_0_${examNum-1}`).css("pointer-events", "none");
            if(datas[examNum-1].answer == answer_dict[optionNum-1]) {
                $(`.0_user_answer_${examNum}`).css("color","green");
                cardLi.removeClass("hasBeenAnswerMistake");
                cardLi.addClass('hasBeenAnswer');
                correctly++;
            } else {
                $(`.0_user_answer_${examNum}`).css("color","red");
                cardLi.removeClass('hasBeenAnswer');
                cardLi.addClass('hasBeenAnswerMistake');
                errornum++;
            }
        } else {
            let answer_dict = ["正确", "错误"]
            $(`.user_answer_${examNum}`).css("display","block");
            $(`#0_user_answer_${examNum}`).text(answer_dict[optionNum-1]);
            $(`#qu_0_${examNum-1}`).css("pointer-events", "none");
            if(datas[examNum-1].answer == answer_dict[optionNum-1]) {
                $(`.0_user_answer_${examNum}`).css("color","green");
                cardLi.removeClass("hasBeenAnswerMistake");
                cardLi.addClass('hasBeenAnswer');
                correctly++;
            } else {
                $(`.0_user_answer_${examNum}`).css("color","red");
                cardLi.removeClass('hasBeenAnswer');
                cardLi.addClass('hasBeenAnswerMistake');
                errornum++;
            }
        }
    });

    $('#test_jiaojuan').click(function () {
        // let answerList = $("#answer-sheets").children();
        alert(`正确率： ${correctly*100/(correctly+errornum)}%`);
    })

});


function shuffle(arr) {
    let newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

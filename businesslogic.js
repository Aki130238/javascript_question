// //変数Questionを宣言 問題配列
// var Questions = [];

//変数CurrentQuestionを宣言　現在の問題配列
var CurrentQuestion = [];

//変数answersAry正解した問題配列
var answersAry = [];

var AnswersCount = 0

var Questions = [
    {
        id: 1,
        sentence: "多くのプログラミング言語でif{}else{}等と書かれる構文で行われる動作条件は[?]。",
        correctAnswer: '分岐',
        selects: ['分岐', '次第', '想定', '構想']
    },
    {
        id: 2,
        sentence: "変数に入れるデータは基本的に値と[?]が求められる。",
        correctAnswer: '型',
        selects: ['型', '式', '数', '枠']
    },
    {
        id: 3,
        sentence: "C、JAVA、PHP、javascriptでのforとは何を行う為の動作であるか",
        correctAnswer: '繰り返し処理',
        selects: ['繰り返し処理', '処理の対象を決める', '処理の呼び出し元を定義する', '処理を停止する']
    },
    {
        id: 4,
        sentence: "例えば画像ファイルの末尾に付けれられたファイルの種類を示すものを何という？",
        correctAnswer: '拡張子',
        selects: ['拡張子', '識別子', '判別子', '終端子']
    },
]


//初期表示イベント
document.addEventListener(
    //Webページが読み込みが完了したとき、ランダムに問題を表示する
    'DOMContentLoaded', function () {
        CurrentQuestion = ArrayRandomaizer(Questions);
        //表示
        setQuestion(0);
    });

//関数宣言 ランダム
function ArrayRandomaizer(original) {
    //変数宣言　
    let tmpAry = original.concat();
    var randomaized = [];
    /*繰り返し処理
    ランダムに問題をセットする
    変数に代入されている問題を次の問題に置き換える
    */
    //tmpAry.length(4)
    //0より大きい場合繰り返し処理をする
    while (0 < tmpAry.length) {
        //temAryの要素数をMath.floor メソッドで小数点以下の値を切り捨ててMath.randomで乱数を生成する
        var set = Math.floor(Math.random() * tmpAry.length);
        //生成した問題を変数setに挿入
        randomaized.push(tmpAry[set]);
        //第1引数で指定した要素から、第2引数で指定した値を取り除く
        //tmpAry（４つの問題）set(0)１(2問目)を削除
        tmpAry.splice(set, 1);
    }
    //randomaizedへ値を返す
    return randomaized;
}


//関数宣言 問題をsentenceにセット解答ボタンを生成
function setQuestion(number) {
    //HTML.CSS要素取得、Answers、resultの挿入
    //関数呼び出し
    countQuestions()
    document.querySelector('#Answers').innerHTML = '';
    //CurrentQuestion要素とnumberが等しいかそれ以下なら処理終了
    if (CurrentQuestion.length <= number) {
        return;
    }
    //questionに現在の問題番号を代入
    var question = CurrentQuestion[number];

    question.selects = ArrayRandomaizer(question.selects);
    document.querySelector('#Sentence').innerHTML = question.sentence;

    //繰り返し処理 解答ボタン生成
    for (let i = 0; i < question.selects.length; i++) {
        //ボタン生成,css付与
        var button = document.createElement('button');
        button.innerHTML = question.selects[i];
        //setAttributeで属性を追加・変更
        button.setAttribute('style', ' display:block ; min-width:300px;cursor:pointer; margin-top: 5px; margin-right: auto; margin-left: auto; ');
        //ボタンクリックイベント処理
        button.addEventListener('click', function () {
            judgeAnswer(number, question.selects[i])

        });
        //createElementで生成したボタンをappendChild()によって要素追加
        document.querySelector('#Answers').appendChild(button);
    }
}


    //関数宣言 結果取得 numberは要素番号：valueは要素名
function judgeAnswer(number, value) {
    console.log(AnswersCount)
        checkQuestion(number, value)
        //問題数１づつ増やす
        setQuestion(number + 1)
        
}


    //問題数カウント関数　numberは問題番号
function countQuestions() {
    //Questions.lengthから問題要素を取得してQuestions.lengthよりnumber問題番号が小さい場合処理を続ける
    //カウントは0から始まるので+1している、Questions.lengthは問題数
    if (answersAry.length <= Questions.length) {
        //文字列とQuestions.lengthを結合してHTMLに表示
        document.querySelector('#count').innerHTML = (answersAry.length + 1) + "問目 " + "/ 全 " + Questions.length + " 問中";
        //そうじゃなければカウントを0にする
    } 
}

    //解答チェック関数numberは要素番号：valueは要素名
function checkQuestion(number, value) {
    
    //質問配列作成
    var question = {}
     //answersAryに正解した答えが存在するかチェック、または問題が存在する場合同じ問題ではないかチェックする
    if (answersAry[number] == undefined || answersAry[number].sentence != CurrentQuestion[number].sentence) {
         question.sentenceに現在の問題を追加
        question.sentence = CurrentQuestion[number].sentence
         //現在の問題の答えと選んだ答えが正解かどうかをtrueかfalseで判別
        question.isCorrect = CurrentQuestion[number].correctAnswer == value
        //判定された値をquestionに挿入
        answersAry.push(question)
        if(CurrentQuestion[number].correctAnswer == value) {
            AnswersCount++;
        }
        if (CurrentQuestion.length == answersAry.length){
            displayResult(AnswersCount);
        }
    }
}

function displayResult(AnswersCount) {
    document.querySelector('#switch').style.display = 'none';
    //HTML要素result部分の取得、blockを指定してresult要素を表示
    document.querySelector('#result').style.display = 'block';
    //解答結果表示
    document.querySelector('#result').innerHTML = "正解数は " + AnswersCount + " 問です!";
} ;
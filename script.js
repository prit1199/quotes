const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter-btn');
const newQuoteBtn=document.getElementById('new-quote-btn');
const loader=document.getElementById('loader');


// show loader 
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
};
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}


function newQuotes(){
    loading()
    const quote=getQuotes[Math.floor(Math.random()*getQuotes.length)];
    // check for author
    if(!quote.author){
        authorText.textContent="Unknown";
    }else{
   authorText.textContent=quote.author; // author of newQuotes[]
    }
    // change the text size of bigger quotes
    if(quote.text.length>150){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote")
    }
   quoteText.textContent=quote.text //text ot newQuotes[]
   complete() 
}

async function quotesApi(){
    loading()
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response= await fetch(apiUrl);
        getQuotes=await response.json();
        newQuotes()
    }catch(error){
        //error
    }
}


// tweet quotes
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet/?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl ,'_blank');
}

// add eventlistner 
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);

quotesApi()

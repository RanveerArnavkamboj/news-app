let resultarea = document.querySelector(".result")
let result
let category
let sports = document.querySelector(".sports")
let more = document.createElement("button")
 more.classList.add("link")
 more.classList.add("first")
let all = document.querySelector(".all")
let pg 
let pgurl
let now = new Date()
let apikey = "pub_ca4d6bd12a80452090f4f256f4a0ac58"
console.log(apikey)

function geturl(){
    if (category){
        return `https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}`
    }else{
        return `https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi`
    }
}
function getpgurl(pg){
    console.log(pg)
    if (category){
    return `https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}&page=${pg}`
    }else {
        return `https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&page=${pg}`
    }
}
let url =geturl()



async function getnews() {
    const response = await fetch(url)
    const data = await response.json()
      console.log(data)
    let info = data.results
    console.log(info)
    return info
  
}
async function getfirstnextpg(){
     more.classList.remove("first")
    const response1 = await fetch(url)
    const data1 = await response1.json()
    console.log(data1)
    let nextpg = data1.nextPage
    console.log(nextpg)
    return nextpg
}
async function getnextpg(pg){
    
    console.log(pgurl)
    const response2 = await fetch(pgurl)
    const data2 = await response2.json()
    console.log(data2)
    let nextpg = data2.nextPage
    console.log(nextpg)
    return nextpg
}

async function getsportsnews() {
    const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=sports`)
    const data = await response.json()
    let info = data.results
    console.log(info)
    return info
}
async function getnextpgresult(pg){
 const response= await fetch(pgurl)
const data = await response.json()
console.log(data)
 let info = data.results
    console.log(info)
    return info
}

async function showresult(result) {
    result=await result
   console.log(result)
    for (let news in result) {
        //card//
        let card=document.createElement("div")
        card.classList.add("card")
        resultarea.append(card)
        //img//
        let img=document.createElement("img")
        img.classList.add("img")
        img.src=result[news].image_url
        card.append(img)
        //textcard//
         let textcard=document.createElement("div")
        textcard.classList.add("textcard")
        card.append(textcard)
        //titlearea//
        let titlearea = document.createElement("div")
        titlearea.classList.add("title")
        textcard.append(titlearea)
        let title = result[news].title
        titlearea.textContent = title
        //descarea//
        let descarea = document.createElement("div")
        descarea.classList.add("desc")
        textcard.append(descarea)
        let desc = result[news].description
        descarea.textContent = desc
        resultarea.classList.add("res")
        //link of giver//
          let linkarea = document.createElement("a")
        linkarea.classList.add("link")
        textcard.append(linkarea)
        let link = result[news].link
        linkarea.href = link
        linkarea.textContent="view full details"
        resultarea.classList.add("res")
        //btn more//
        
    }
   
   resultarea.append(more)
   more.textContent="more"
    
  
}
 result = getnews()
showresult(result)


sports.addEventListener("click",()=>{
     category = "sports"
resultarea.textContent=""
url+=``
pgurl+=`&category=${category}`
result =  getsportsnews()
showresult(result)
})
all.addEventListener("click",()=>{
     resultarea.textContent=""
     category = "none"
    if(url=`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}`|| pgurl==`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}&page=${pg}`){
       
   url = url.replace(`&category=${category}`, "")
   pgurl = pgurl.replace(`&category=${category}`, "")
    }
    result =  getnews()
showresult(result)
})
more.addEventListener("click",async ()=>{
   if (more.classList.contains("first")){
     pg = await getfirstnextpg()
      pgurl = getpgurl(pg)
      if (category=="none"){
       if(url=`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}`|| pgurl==`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}&page=${pg}`){
       
   url = url.replace(`&category=${category}`, "")
   pgurl = pgurl.replace(`&category=${category}`, "")
    }
}
     console.log(pg)
  result = getnextpgresult(pg)
  showresult(result)
   }else{
       pg = await getnextpg(pg)
        pgurl = getpgurl(pg)
        if (category=="none"){
          if(url=`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}`|| pgurl==`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=${category}&page=${pg}`){
       
   url = url.replace(`&category=${category}`, "")
   pgurl = pgurl.replace(`&category=${category}`, "")
    }
}
     console.log(pg)
  result = getnextpgresult(pg)
  showresult(result)
   }
})

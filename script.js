let resultarea = document.querySelector(".result")
let sports = document.querySelector(".sports")
let apikey = "pub_ca4d6bd12a80452090f4f256f4a0ac58"
async function getnews() {
    const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi`)
    const data = await response.json()

    let info = data.results
    console.log(info)
    return info
}
async function getsportsnews() {
    const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apikey}&country=in&language=hi&category=sports`)
    const data = await response.json()

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
        console.log(link)
        linkarea.href = link
        console.log(linkarea)
        linkarea.textContent="view full details"
        resultarea.classList.add("res")
    }
}
 let result = getnews()
showresult(result)


sports.addEventListener("click",()=>{
resultarea.textContent=""
result =  getsportsnews()
showresult(result)
})

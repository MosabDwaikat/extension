const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const leadsEl = document.getElementById("leads-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))
let leads = []

if(leadsFromLocalStorage){
    leads = leadsFromLocalStorage
    update(leads)
}

inputBtn.addEventListener("click", ()=>{
    
    if(inputEl.value !=="")
        leads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("leads", JSON.stringify(leads))
    update(leads)
})

tabBtn.addEventListener("click", ()=>{
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    //     // since only one tab should be active and in the current window at once
    //     // the return variable should only have one entry
    //     let activeTab = tabs[0];
    //     let activeTabId = activeTab.id; // or do whatever you need
   
    //  })
     chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        update(leads)
     })
     
})

deleteBtn.addEventListener("dblclick", ()=>{
    localStorage.clear()
    leads.length=0
    update(leads)
    document.documentElement.style.height = "0rem"
})


function update(array){
    leadsEl.textContent=""
   
    array.forEach(e=>
        {
            const li = document.createElement("li")
            const a =document.createElement("a")
            a.textContent =e
            a.href = e
            a.target="_blank"
            li.appendChild(a) 
            leadsEl.appendChild(li)}
            
        )
      

}
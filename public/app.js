const hello = "hello world"
const getUrl = "https://rest-api-8154b.firebaseio.com/.json?"
const randomUrl ="https://randomuser.me/api/"
const postUrl = "https://rest-api-8154b.firebaseio.com/users.json?"


fetch(getUrl)
    .then(res => res.json())
    .then(data => {
        let keys = Object.keys(data['users'])
        console.log(keys)
    })

add()
view()

function add() {
    const el = document.getElementById('add')
    el.addEventListener('click', (e) => {
        //apiAdd()
        getRandom()
    })
}



function getRandom(){
    return fetch(randomUrl).then(res => res.json()).then(data => {
        const sc = data['results'][0]
        sc['lvl'] = 'user'
        fetch(postUrl, {
            method: 'POST',
            body: JSON.stringify(sc),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })
}


function view(){
    fetch(getUrl)
    .then(res => res.json())
    .then(data => {
        
        const elem = document.getElementById('test')

        for(let d in data['users']){
            const sc = data['users'][d]
            console.log(sc['picture']['thumbnail'])
           const  para = document.createElement("p");
           const thumb = document.createElement('img')
           thumb.src = sc.picture.thumbnail
            const node = document.createTextNode(` ${sc.name.first}  : ${sc.email} `);
            const  delBtn = document.createElement("button");
            const  updateBtn = document.createElement("button");
            updateBtn.data = `${d}`
            delBtn.data = `${d}`
            const  input = document.createElement("input");
            input.placeholder = `${sc.name.first}`
            input.id = d
            delBtn.addEventListener('click',(e)=>{
                const delUrl = `https://rest-api-8154b.firebaseio.com/users/${e.target.data}.json?`
                fetch(delUrl, {
                    method:"DELETE",
                    headers:{
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({}) //empty object
                })
                .then(e => console.log('deleted'))
            })
            updateBtn.addEventListener('click',(e) => {
                const updateUrl = `https://rest-api-8154b.firebaseio.com/users/${e.target.data}.json?`
            
                let short = document.getElementById(`${d}`)
                sc.name.first = short.value //first name changed
                fetch(updateUrl, {
                    method:"PUT",
                    headers:{
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(sc) //updated user
                })
                
            })
            const delBtnTxt = document.createTextNode('delete')
            const updateBtnTxt = document.createTextNode('update')
            delBtn.appendChild(delBtnTxt)
            updateBtn.appendChild(updateBtnTxt)
            para.appendChild(thumb)
            para.appendChild(node);
            para.appendChild(delBtn)
            para.appendChild(input)
            para.appendChild(updateBtn)
            elem.appendChild(para)

        }
        
    })

}

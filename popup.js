function readXml(xmlFile){
    
    let xmlDoc;

    if(typeof window.DOMParser != "undefined") {
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,false);
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://archiveofourown.org/");

    if (xmlhttp.overrideMimeType){
            xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    }
    else{
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.load(xmlFile);
    }
    return xmlDoc;
}

let xml = readXml("https://archiveofourown.org/tags/38408767/feed.atom");

var entry = xml.getElementsByTagName("entry");
const it = [];
const id = [];
const date = [];
for ( i = 0; i < entry.length; i++){
    
    it.push(entry[i].getElementsByTagName("title")[0].firstChild.data);
    id.push(entry[i].getElementsByTagName("id")[0].firstChild.data);
    date.push(entry[i].getElementsByTagName("updated")[0].firstChild.data);

}

const titles = new Map();
const dates = new Map();
id.forEach((element, index) => {
    titles.set(element,it[index]);
    dates.set(element,new Date(date[index]));
});
                
const dates_sorted = new Map([...dates].sort((a, b) => a[1] - b[1]));
const id_sorted = [...dates_sorted.keys()];

function index_to_link(element){

    let link;

    link = "https://archiveofourown.org/works/" + element.substr(-8);

    return link;
}

id_sorted.forEach((element,index) => {
    var ListNode = document.querySelector('ul.Lists-new'),
        liNode = document.createElement('li'),
        a  = document.createElement('a'),
        a2 = document.createElement('a'),
        i = document.createElement('i')
        ;
    i.className = "fa-solid fa-rss Rss";
    liNode.className = "List-item";
    a.setAttribute('href',index_to_link(element));
    a.textContent = titles.get(element);
    a.className = "List-item-link";
    a2.setAttribute('href','#');
    a2.className = "List-item-link two";
    a2.textContent = "3 days ago";
    liNode.appendChild(i);
    liNode.appendChild(a);
    liNode.appendChild(a2);
    ListNode.appendChild(liNode);
})
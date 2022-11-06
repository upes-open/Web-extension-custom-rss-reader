  
  function readXml(xmlFile){
​
    let xmlDoc;
​//creating the XHR object and setting the headers
    if(typeof window.DOMParser != "undefined") {
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,false);
        xmlhttp.seftRequestHeader("Access-Control-Allow-Origin", "*");
​//to parse the data as xml
    if (xmlhttp.overrideMimeType){
            xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    }
  
    return xmlDoc;
    }
​//we were getting a  cors error so we are using the proxy server
let xml = readXml("https://cors-anywhere.herokuapp.com/https://archiveofourown.org/tags/38408767/feed.atom");
//printing all the titles in the xml
var entry = xml.getElementsByTagName("entry");
for ( i = 0; i < entry.length; i++){
    
console.log(entry[i].getElementsByTagName("title")[0].firstChild.data);

}
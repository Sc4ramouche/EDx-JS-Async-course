function createTableHeader(tableId) {
  let tableHeaderRow = document.createElement('tr');
  let th1 = document.createElement('th');
  let th2 = document.createElement('th');
  let th3 = document.createElement('th');
  let th4 = document.createElement('th');

  th1.appendChild(document.createTextNode('ProductId'));
  th2.appendChild(document.createTextNode('Type'));
  th3.appendChild(document.createTextNode('Price'));
  th4.appendChild(document.createTextNode('Examine'));

  tableHeaderRow.appendChild(th1);
  tableHeaderRow.appendChild(th2);
  tableHeaderRow.appendChild(th3);
  tableHeaderRow.appendChild(th4);

  document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
  const tableBody = document.getElementById(tableId);

  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }

  createTableHeader(tableId);

  for (i = 0; i < productArray.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('TD');
    const td2 = document.createElement('TD');
    const td3 = document.createElement('TD');
    const td4 = document.createElement('button');

    td4.addEventListener('click', function () {
      processSearch(this.parentNode.firstChild.innerHTML);
    });

    td1.appendChild(document.createTextNode(productArray[i].id));
    td2.appendChild(document.createTextNode(productArray[i].type));
    td3.appendChild(document.createTextNode(productArray[i].price));
    td4.appendChild(document.createTextNode("Examine"));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tableBody.appendChild(tr);
  }
}

function updateExaminedText(product) {
  let outputString = "Product ID: " + product.id;
  outputString += "<br> Price: " + product.price;
  outputString += "<br> Type: " + product.type;
  document.getElementById('productText').innerHTML = outputString;
}

function getIntersection(arrA, arrB, searchedId) {
  const samePrice = arrA;
  const sameType = arrB;
  const similarArray = [];
  samePrice.forEach(function (obj1) {
    sameType.forEach(function (obj2) {
      if (obj1.id == obj2.id && obj1.id != searchedId) {
        similarArray.push(obj1);
      }
    })
  });

  return similarArray;
}

function processSearch(searchId) {
  api.searchProductById(searchId).then(function (val) {
    return Promise.all([api.searchProductsByPrice(val.price, 50), api.searchProductsByType(val.type), val]);
  }).then(function (val) {
    let similarArray = getIntersection(val[0], val[1], val[2].id);
    updateExaminedText(val[2]);
    updateTable('similarTable', similarArray);
  }).catch(function (val) {
    alert(val);
  });
}

api.searchAllProducts().then(function (value) {
  updateTable('allTable', value);
});

document.getElementById("inputButton").addEventListener('click',function(){
  processSearch(document.getElementById('input').value);
});
console.log('connected')
let count = 0;
const addItemField = document.querySelector(".addItemInputField");
const contentContainer = document.querySelector(".content-container");

const addItemBtn = () => {
  if (addItemField.value === '') {
    alert("enter something!");
  } else {
    count++;
    const tr = document.createElement("tr");

    tr.style.borderBottom = "1px solid black";

    tr.innerHTML = `
    <td style="background-color: #eee; border-right: 1px solid black; font-weight: 600;">${count} </td>

    <td style="text-align: justify; font-weight: 600; border-right: 1px solid black; word-break: break-all;" class="w-100">${addItemField.value}</td>
    
    <td class="d-flex flex-column flex-md-row gap-1 border-0 text-center">
        <button class="btn btn-danger px-1 py-0 text-white deletBtn" style="font-weight: 500">X</button>
        <button class="btn btn-success px-1 py-0 doneBtn" style="font-weight: 500">Done</button>
    </td> `;

    contentContainer.appendChild(tr);
    addItemField.value = "";

    updateSerialNumbers();
    saveData();
  }
}

// Clear all button----------------
const clearAll = document.querySelector(".clear-btn").addEventListener('click', (e) => {
  contentContainer.innerHTML = "";
  localStorage.removeItem("data");
  count = 0;
});

// Local storage-------------------
const saveData = () => {
  localStorage.setItem("data", contentContainer.innerHTML);
}
// update the serial number
const updateSerialNumbers = () => {
  const taskRows = document.querySelectorAll(".content-container tr");
  taskRows.forEach((row, index) => {
    row.querySelector("td:first-child").innerText = index + 1;
  });
};

const showTask = () => {
  contentContainer.innerHTML = localStorage.getItem("data");
  const taskRows = document.querySelectorAll(".content-container tr");
  taskRows.forEach((row) => {
    const isDone = row.getAttribute("data-done") === "true";
    if (isDone) {
      row.style.transitionDuration = '500ms';
      row.style.backgroundColor = '#04AA6D';
      row.style.fontWeight = 'semibold';
    }
  });
};

contentContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('deletBtn')) {
    event.target.closest('tr').remove();
    updateSerialNumbers();
    saveData();
  } else if (event.target.classList.contains('doneBtn')) {
    const taskRow = event.target.parentNode.parentNode;
    const isDone = taskRow.getAttribute("data-done") === "true";

    if (!isDone) {
      taskRow.querySelector("td:nth-child(2)").style.backgroundColor = '#66FF66'
      taskRow.querySelector("td:nth-child(2)").style.transitionDuration = '500ms';
      taskRow.querySelector("td:nth-child(2)").style.fontWeight = 'semibold';
      taskRow.querySelector("td:nth-child(2)").style.textDecoration = 'line-through';
      taskRow.querySelector("td:nth-child(2)").setAttribute("data-done", true);
      taskRow.querySelector("td:nth-child(2)").disabled = true;
    } else {
      // taskRow.querySelector("td:nth-child(2)").style.backgroundColor = '';
      // taskRow.style.transitionDuration = '';
      // taskRow.style.backgroundColor = '';
      // taskRow.style.fontWeight = '';
      // taskRow.setAttribute("data-done", false);
    }
    saveData();
  }
});

showTask();
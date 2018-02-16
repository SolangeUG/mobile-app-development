const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  LIST_ITEM: 'list-item'
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Globals
this.counter = 0
this.uncheckedCounter = this.counter

/* ********************************
 * Create a new task and add it   *
 * to the list of tasks           *
 * ********************************/
function newTodo() {
  // prompt user for todo detail
  let form = getTodoForm()
  document.getElementById('form-container').innerHTML = form
  document.getElementById('task-detail').focus()
  let submit = document.getElementById('submit')

  // a function to save the new task detail input by the user
  submit.onclick = function() {
    let detail = document.getElementById('task-detail').value
    document.getElementById('form-container').innerHTML = ""
    if (! detail) {
      return
    }

    // update todo-list content
    list.append(getListItem(detail))
    // update item-count
    updateListCounter(1)
    // update unchecked-count
    updateUncheckedCounter(1)
  }
}

/* ********************************
 * Return a new list itme to hold *
 * an addition to the todo-list   *
 * ********************************/
function getListItem(detail) {

  // create the checkbox element
  let checkbox = document.createElement('input')
  checkbox.setAttribute("type", "checkbox")
  checkbox.classList.add(classNames.TODO_CHECKBOX)
  checkbox.onclick = function() {
    let value = checkbox.checked ? -1 : 1
    updateUncheckedCounter(value)
  }

  // create the content element
  let content = document.createElement('label')
  content.innerHTML = getTaskDetail(detail)
  content.classList.add(classNames.TODO_TEXT)

  // create the container element
  let container = document.createElement('div')
  container.classList.add(classNames.TODO_ITEM)
  container.append(checkbox)
  container.append(content)

  // create the list-item element
  let listItem = document.createElement('li')
  listItem.classList.add(classNames.LIST_ITEM)
  listItem.append(container)

  return listItem
}


/* ********************************
 * Return a string representation *
 * of the current date.           *
 * ********************************/
function getCurrentDate() {
  let currentDate = new Date()
  return currentDate.toLocaleString("en-GB")
}

/* ********************************
 * Return a string representation *
 * of the task detail             *
 * ********************************/
function getTaskDetail(detail) {
  let detailStr = "<p>"
  if (detail) {
    detailStr = detail + "<br/>"
  }
  detailStr += "Date: " + getCurrentDate()
  detailStr += "</p>"
  return detailStr
}

/* ***********************************
 * Update number of total elements   *
 * whenever a new task is created    *
 * ***********************************/
function updateListCounter(inc) {
  this.counter += inc
  itemCountSpan.innerHTML = this.counter
}

/* ***********************************
 * Update number of uncheck elements *
 * whenever a checkbox value changes *
 * ***********************************/
function updateUncheckedCounter(inc) {
  this.uncheckedCounter += inc
  uncheckedCountSpan.innerHTML = this.uncheckedCounter
}

/* ***********************************
 * Return a form for inputting a new *
 * task detail information           *
 * ***********************************/
function getTodoForm() {
  let formHTML =
    "<form id=\"todo-form\">" +
      "<div class=\"form-group\">"+
        "<label class=\"form-label\">Enter task detail</label>" +
        "<textarea id=\"task-detail\" class=\"form-control\" rows=\"3\"></textarea>" +
        "<button id=\"submit\" class=\"form-button\">Submit</button>" +
      "</div>" +
    "</form>"
  return formHTML;
}

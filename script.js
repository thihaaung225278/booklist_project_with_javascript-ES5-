//Book Data Constrouctor
function Book(title,author,isbn){
	this.title = title;
	this.author = author;
	this.isbn =isbn;
}

//UI Constructor
function UI(){};

UI.prototype.addBookToList = function(book){
	//select book-list tbody
	const list = document.getElementById('book-list');
	//create tr element
	const tr = document.createElement('tr');
	//Insert td to tr
	tr.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
	`;
	//append tr to list
	list.appendChild(tr);
}

UI.prototype.clearBookDataFromForm = function(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message,className){
	//create div element
	const div = document.createElement('div');
	//add className to div element
	div.className = `alert ${className}`;
	//create text node and append to div
	div.appendChild(document.createTextNode(message));
	//select parent
	const container = document.querySelector('.container');
	//select form
	const form = document.getElementById('book-form');
	//insert alert div between h1 and form element
	container.insertBefore(div,form);
	//setTimeout after 3 second
	setTimeout(function(){
		document.querySelector('.alert').remove();
	},3000);
}

UI.prototype.deleteBook = function(target){
	if(target.className == 'delete'){
		target.parentElement.parentElement.remove();
	}
}

//Event Listener for add book 
document.getElementById('book-form').addEventListener('submit',function(e){
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;
	
	//Instantiate Book
	const book = new Book(title,author,isbn);

	//Instantiate UI
	const ui = new UI();

	if(title == '' || author == '' || isbn == ''){
		//show error alert
		ui.showAlert('Please fill your text field.','error');
	}else{
		//Add Book to List
		ui.addBookToList(book);
		//show success alert 
		ui.showAlert('Add Book Successfully!','success');
		//Clear Book form data
		ui.clearBookDataFromForm();
	}

	e.preventDefault();
});

//Event Listener for delete book
document.getElementById('book-list').addEventListener('click',function(e){
	const ui = new UI();

	//delete book
	ui.deleteBook(e.target);
	//show success alert
	ui.showAlert('Delete Book Successfully!','success');

	e.preventDefault();
});
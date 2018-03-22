// alert("Hello");

/*Event Handler for submit event of the form*/

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();
	var issueStatus = 'Open';

	var issue = { 		/*creating object*/
		id: issueId,
		descrption: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}
	/* inserting object to local storage */
	if(localStorage.getItem('issues') == null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}else{
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues',JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();

	fetchIssues();

	e.preventDefault();
}
	
	function setStatusClosed(id) {
		var issues = JSON.parse(localStorage.getItem('issues'));

		for(var i=0; i< issues.length; i++){
			if(issues[i].id == id){
				issues[i].status = 'Closed';
			}
		}
		localStorage.setItem('issues', JSON.stringify(issues));

		fetchIssues();
	}

	function deleteIssues(id){
		var issues = JSON.parse(localStorage.getItem('issues'));

		for(var i=0; i< issues.length; i++){
			if(issues[i].id == id){
				issues.splice(i,1);//TO Delete/Remove the element the element from the array
			}
		}
		localStorage.setItem('issues', JSON.stringify(issues));

		fetchIssues();


	}




function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues')); /*To retrieve item from local storage*/
	var issuesList = document.getElementById('issuesList');

	issuesList.innerHTML = '';

	for(var i = 0; i <i< issues.length; i++){
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;


		/*generate output for html element*/

		issuesList.innerHTML +='<div class="card">'+
								'<h6> Issue Id: ' + id + '</h6>'+
								'<p><span class="label lable-info">'+ status + '</span></p>'+
								'<h3>'+ desc +'</h3>'+
								'<p><span class="glyphicon glyphicon-time"></span>'+ severity + '</p>'+
								'<p><span class="glyphicon glyphicon-user"></span>'+ assignedTo+ '</p>'+
								'<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
								'<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
								'</div>';

	}	
}
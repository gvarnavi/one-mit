<?php
	header('Content-type: application/json');
	
	include 'db-init.php';
	//connect with the database
	$db = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);
    
	//get search term
	$searchTerm = $_GET['term'];
	$words=explode(" ",$searchTerm);

	//space separate
	$strings=array();
	foreach($words as $substring){
		$strings[]="fullName LIKE '%".$substring."%'";
	}
	$imploded=implode($strings," AND ");

	//perform query
	$maxQuery=15;
	$queryString="SELECT DISTINCT * FROM locations WHERE ".$imploded." LIMIT ".$maxQuery;
	$query = $db->query($queryString);
	
	//get matched data from table
	while ($row = $query->fetch_assoc()) {

		$row['value']=stripslashes($row['fileLocation']);
		$row['label']=$row['fullName'];
		$row_set[] = $row;
	}
	if (sizeof($row_set)==$maxQuery){
		$row['value']="";
		$row['label']="-----------";
		$row_set[] = $row;
	
		$row['value']="";
		$row['label']="Try with more detail";
		$row_set[] = $row;
	}

	//return json data
	echo json_encode($row_set);
?>

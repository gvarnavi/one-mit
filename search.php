<?php
	header('Content-type: application/json');
	
	include 'db-init.php';
	//connect with the database
	$db = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);
    
	//get search term
	$searchTerm = $_GET['term'];
	$words=explode(" ",$searchTerm);
	$number=count($words);

	if($number==1){
		$query = $db->query("SELECT DISTINCT * FROM locations WHERE firstName LIKE '%".$words[0]."%' OR secondName LIKE '%".$words[0]."%' OR thirdName LIKE '%".$words[0]."%' LIMIT 15");
	}elseif($number==2){
		$query = $db->query("SELECT DISTINCT * FROM locations WHERE 
			(firstName LIKE '%".$words[0]."%' AND secondName LIKE '%".$words[1]."%')  OR
		       	(firstName LIKE '%".$words[0]."%' AND thirdName LIKE '%".$words[1]."%')   OR 
		       	(secondName LIKE '%".$words[0]."%' AND firstName LIKE '%".$words[1]."%')  OR 
		       	(secondName LIKE '%".$words[0]."%' AND thirdName LIKE '%".$words[1]."%')  OR 
		       	(thirdName LIKE '%".$words[0]."%' AND firstName LIKE '%".$words[1]."%')   OR 
		       	(thirdName LIKE '%".$words[0]."%' AND secondName LIKE '%".$words[1]."%') 
			LIMIT 15");
	}else{
		$query = $db->query("SELECT DISTINCT * FROM locations WHERE 
			(firstName LIKE '%".$words[0]."%' AND secondName LIKE '%".$words[1]."%' AND thirdName LIKE '%".$words[2]."%') OR
		       	(firstName LIKE '%".$words[0]."%' AND thirdName LIKE '%".$words[1]."%' AND secondName LIKE '%".$words[2]."%') OR 
		       	(secondName LIKE '%".$words[0]."%' AND firstName LIKE '%".$words[1]."%' AND thirdName LIKE '%".$words[2]."%') OR 
		       	(secondName LIKE '%".$words[0]."%' AND thirdName LIKE '%".$words[1]."%' AND firstName LIKE '%".$words[2]."%') OR 
		       	(thirdName LIKE '%".$words[0]."%' AND firstName LIKE '%".$words[1]."%' AND secondName LIKE '%".$words[2]."%') OR 
		       	(thirdName LIKE '%".$words[0]."%' AND secondName LIKE '%".$words[1]."%' AND firstName LIKE '%".$words[2]."%') 
			LIMIT 15");
	}
	//get matched data from table
	while ($row = $query->fetch_assoc()) {

		$row['value']=stripslashes($row['fileLocation']);
		$row['label']=implode(" ", array($row['firstName'],$row['secondName'],$row['thirdName']));
		$row_set[] = $row;
	}
    
	//return json data
	echo json_encode($row_set);
?>

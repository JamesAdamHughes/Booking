var people = ['Antonia', "Jasmin", 'Miranda', "Kevin", 'James B', 'James H', "Anuja", 'Graham', 'Craig', 'Joe', 'Becky', 'Asia', 'Patrick', 'Dana', 'Rytis', 'Dainius', 'Khamise', 'Sophia', 'Yvonne', 'Heidi', 'Kitty'];
people.sort();

exports.createController = function(){
	var self = this;

	var getAllPeople = function() {
		return people;
	}

	return {
		getAllPeople: getAllPeople
	}
}
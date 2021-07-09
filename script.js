
var form = document.getElementsByTagName('form')[0],
	ingredient = document.getElementsByTagName('input')[0],
	listAll = document.getElementsByTagName('ul')[0],
	btnResult = document.getElementsByTagName('input')[2],
	resultCount = document.getElementsByTagName('h2')[1],
	error1 = document.getElementsByTagName('p')[0],
	error2 = document.getElementsByTagName('p')[1],
	arrMagical = [], AllPermutator = [], magicalPermutator = [],
	tmpArr, magicalAction, listIngredient;

function permutator(inputArr) {
	let results = [];
	function permute(arr, memo) {
		var cur, memo = memo || [];
		for (let i = 0; i < arr.length; i++) {
			cur = arr.splice(i, 1);
			if (arr.length === 0) {
				results.push(memo.concat(cur));
			}
			permute(arr.slice(), memo.concat(cur));
			arr.splice(i, 0, cur[0]);
		}
		return results;
	}
	return permute(inputArr);
}

form.addEventListener('submit', function(e){
	e.preventDefault();
	
	if(ingredient.value.length >= 1 && ingredient.value.length < 20 ){
		error1.style.display = 'none';
		tmpArr = ingredient.value.split(',');
		if(tmpArr.length == 2){
			error2.style.display = 'none';
			magicalAction = tmpArr[1].trim();
			arrMagical.push(magicalAction);

			listIngredient = document.createElement('li');
			listIngredient.innerText = ingredient.value;
			listAll.appendChild(listIngredient);
			btnResult.style.display = 'block';
		}else{
			error2.style.color = 'red';
			error2.style.display = 'block';
		}
	}else{
		error1.style.color = 'red';
		error1.style.display = 'block';
		error2.style.display = 'none';
	}
}, false);

btnResult.addEventListener('click', function(e){

	AllPermutator = permutator(arrMagical);
	//console.log(AllPermutator);
	for(let i = 0; i < AllPermutator.length; i++){
		flag = 1;
		for(let x = 0; x < AllPermutator[i].length - 1; x++){
			if(AllPermutator[i][x] == AllPermutator[i][x + 1]){
				flag = 2;	
			}
		}
		if(flag == 1){
			magicalPermutator.push(AllPermutator[i]);
		}
	}
	//console.log(magicalPermutator);
	resultCount.innerText = magicalPermutator.length;
	magicalPermutator = [];
}, false);



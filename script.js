
var form = document.getElementsByTagName('form')[0],
	ingredient = document.getElementsByTagName('input')[0],
	listAll = document.getElementsByTagName('ul')[0],
	btnResult = document.getElementsByTagName('input')[2],
	resultCount = document.getElementsByTagName('h2')[1],
	error = document.getElementsByTagName('p')[0],
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
		error.style.display = 'none';
		tmpArr = ingredient.value.split(',');
		if(tmpArr.length == 2){
			magicalAction = tmpArr[1].trim();
			arrMagical.push(magicalAction);
			listIngredient = document.createElement('li');
			listIngredient.innerText = ingredient.value;
			listAll.appendChild(listIngredient);
			btnResult.style.display = 'block';
		}else{
			error.innerText = 'Невалидни данни';
			error.style.color = 'red';
			error.style.display = 'block';
		}
	}else{
		error.innerText = '1 ≤ ingredients.length < 20';
		error.style.color = 'red';
		error.style.display = 'block';
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



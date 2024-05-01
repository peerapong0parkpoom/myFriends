let friendsCount = 0;
function generateFriends() {
    friendsCount = Math.floor(Math.random() * 9) + 1;
    let formHtml = '';
    for (let i = 0; i < friendsCount; i++) {
        formHtml += `<div class="friend-group"><input type="text" placeholder="Friend #${i + 1} Name" class="friend-item" name="name${i}" required><input type="number" placeholder="Age" class="age" name="age${i}" required></div><br>`;
    }
    document.getElementById('friend-forms').innerHTML = formHtml;
    document.getElementById('submit').style.display = 'block';
    document.getElementById('calculation-choice').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
}

document.getElementById('generate-friends').addEventListener('click', generateFriends);

document.getElementById('friend-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally
    const formData = new FormData(event.target);
    let friends = [];
    for (let i = 0; i < friendsCount; i++) {
        const name = formData.get(`name${i}`);
        const age = parseInt(formData.get(`age${i}`), 10);
        friends.push({ name, age });
    }

    const choice = document.getElementById('calculation-choice').value;
    console.log("this choice" , choice)
    let output = '';
    switch (choice) {
        case 'total':
            const totalAge = friends.reduce((acc, cur) => acc + cur.age, 0);
            output = `Total Age: ${totalAge}`;
            break;
        case 'average':
            const averageAge = friends.reduce((acc, cur) => acc + cur.age, 0) / friends.length;
            output = `Average Age: ${averageAge.toFixed(2)}`;
            break;
        case 'youngest':
            const minAge = Math.min(...friends.map(friend => friend.age));
            const youngest = friends.filter(friend => friend.age === minAge);
            if (youngest.length > 1) {
                // If more than one youngest friend, show all friends
                output = 'All Friends:<br>' + friends.map(friend => `${friend.name} (${friend.age})`).join('<br>');
            } else {
                // If only one youngest friend, show only that friend
                output = `Youngest Friend: ${youngest.map(friend => `${friend.name} (${friend.age})`).join('')}`;
            }
            break;
        case 'oldest':
            const maxAge = Math.max(...friends.map(friend => friend.age));
            const oldest = friends.filter(friend => friend.age === maxAge);
            if (oldest.length > 1) {
                // If more than one youngest friend, show all friends
                output = 'All Friends:<br>' + friends.map(friend => `${friend.name} (${friend.age})`).join('<br>');
            } else {
                // If only one youngest friend, show only that friend
                output = `Oldest Friend: ${oldest.map(friend => `${friend.name} (${friend.age})`).join('')}`;
            }
            break;
    }
    console.log("this output " , output)
    document.getElementById('results').innerHTML = output;
});

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('friend-forms').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('submit').style.display = 'none';
    document.getElementById('calculation-choice').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    generateFriends();
});
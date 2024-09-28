const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
],
    genders = [
        "Male", "Female"
    ],
    relationships = [
        "Father", "Mother", "Stepfather", "Stepmother", "Guardian", "Aunt", "Uncle", "Grandmother", "Grandfather", "Foster Parent", "Adoptive Parent", "Adoptive Aunt/Uncle", "Legal Guardian", "Godparent", "Family Friend", "Social Worker", "Caregiver", "Other"
    ],
    binary = [
        "Yes", "No"
    ],
    baptism = [
        "Baptised", "Not Baptised"
    ],
    grade = [
        "SS1", "SS2", "SS3", "University Aspirant", "100 Level", "200 Level", "300 Level", "400 Level", "500 Level"
    ],
    academicInterests = [
        "STEM (Science, Tech, Eng, Math)", "Arts", "Humanities", "Languages", "Social Sciences", "Business", "Health Sciences", "Engineering", "Computer Science", "Music", "Drama/Theatre", "Sports Management", "Journalism", "Other"
    ],
    hobbies = [
        "Outdoor Adventures", "Sports/Fitness", "Reading", "Gaming", "Cooking", "Traveling", "Language Learning", "Volunteering", "Yoga/Meditation", "Gardening", "Water Activities", "Cycling", "Social Dancing", "Star Gazing/Astronomy", "Cultural Crafts", "Listening to Music"
    ],
    talents = [
        "Creative Writing", "Visual Arts", "Music Composition", "Singing", "Rapping", "Audio Production", "Dance Choreography", "Public Speaking", "Coding/Software Development", "Beauty/Fashion", "Graphic Design", "Photography", "Videography", "Engineering/Mechanics", "Scientific Research", "Language Translation", "Business/Entrepreneurship", "Architecture"
    ],
    interests = [
        "Community Service", "Leadership Development", "Music Team", "Outreach & Evangelism", "Mentorship Programs", "Bible Study", "Prayer Team", "Events & Programs", "Spiritual Growth", "Counseling", "Media Team"
    ],
    referrals = [
        "Children's Class Graduation", "Joined Church as a Teen", "Mail", "Social Media", "Online Search", "School Program", "Neighborhood Outreach", "Friend", "Family Member", "Other"
    ];

$ = (selector) => document.querySelector(selector);
$$ = (selector) => document.querySelectorAll(selector);
set = (key, value) => localStorage.setItem(key, value);
get = (key) => localStorage.getItem(key);
del = (key) => localStorage.removeItem(key);

const selects = $$("select"),
    inputs = $$("input:not([type='checkbox']):not(#zip):not(#teenPhone):not(#teenEmail):not(#guardEmail):not(#school):not(#facebook):not(#instagram):not(#x):not(#tiktok):not(#support):not(#suggestions):not(#needs)"),
    avatarInput = $('#avatarInput'),
    // picAlert = $('#picAlert'),avatarInput
    avatar = $('#avatar'),
    firstName = $('#name'),
    avatarClone = $('#avatarClone'),
    nameClone = $('#nameClone'),
    uploadedAvatar = get('avatarClone'),
    uploadedName = get('nameClone'),
    form = $('form'),
    url = new URL(window.location.href),
    canonicalUrl = url.origin + url.pathname;

document.head.innerHTML += `
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="instagram:url" content="${canonicalUrl}">
    `;

// populate the select element with options
popSel = (select, dataset) => {
    dataset.forEach(function (entry) {
        var option = document.createElement("option");
        option.value = entry;
        option.text = entry;
        $(select).appendChild(option);
    });
}

// populate the multichoice div element with form check components
popMulti = (multichoice, dataset, name) => {
    toID = (str) => {
        return str.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }
    dataset.forEach(function (entry) {
        const choice = `
                    <div class="form-check">
                        <label class="form-check-label" for="${toID(entry)}">
                            <input class="form-check-input" type="checkbox" value="${entry}" name="${name}" id="${toID(entry)}">    
                            ${entry}
                        </label>
                    </div>
                    `;
        $(multichoice).innerHTML += choice;
    });
}

require = (fields) => {
    fields.forEach((field) => {
        field.setAttribute("required", true);
    });
}

slideIn = (obj, classStr) => {
    obj.classList.add(classStr);
    setTimeout(() => {
        obj.classList.remove(classStr);
    }, 3000);
}

avatar.addEventListener('click', () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
    const image = e.target.files[0],
        reader = new FileReader(),
        file = avatarInput.files[0],
        fileSize = file.size / 1024 / 1024, // in MB
        fileExtension = file.name.split('.').pop().toLowerCase();

    reader.onload = (e) => {
        avatar.src = e.target.result;
        set('avatarClone', e.target.result);
    };
    reader.readAsDataURL(image);

    if (fileSize > 5) {
        console.log('Image file size exceeds 5MB limit.');
        avatarInput.value = '';
    } else if (!['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'tif', 'tiff'].includes(fileExtension)) {
        alert('Only JPG, JPEG, PNG, and GIF file formats are allowed.');
        avatarInput.value = '';
    } else {
        console.log('Image file is valid.');
        slideIn($('#picAlert'), 'picAlert');
    }
});

firstName.addEventListener("change", () => {
    set('nameClone', firstName.value);
})

form.addEventListener('submit', ()=>{
    setTimeout(() => {
        form.reset();
        avatar.src = 'img/user.svg';
    }, 5000)
})

popSel("#state", states);
popSel("#relationship", relationships);
popSel("#repentance", binary);
popSel("#baptism", baptism);
popSel("#grade", grade);
popSel("#referral", referrals);
popSel("#gender", genders);

popMulti("#academicInterests", academicInterests, "Academic Interests");
popMulti("#hobbies", hobbies, "Hobbies");
popMulti("#talents", talents, "Talents");
popMulti("#interests", interests, "Interests");

require(selects);
require(inputs);

// "Outdoor Adventures (hiking, camping, trekking)", "Sports (team, individual, martial arts)", "Reading (fiction, non-fiction, poetry)", "Gaming (video, board, card)", "Cooking (baking, global cuisines, food photography)", "Traveling (cultural exploration, backpacking)", "Language Learning (conversational, written)", "Volunteering (community service, animal welfare)", "Yoga/Meditation (Hatha, Vinyasa, mindfulness)", "Gardening (urban, rural, permaculture)", "Water Activities (swimming, surfing, kayaking)", "Cycling (road, mountain, leisure)", "Social Dancing (salsa, swing, ballroom)", "Star Gazing/Astronomy (telescope, astrophotography)", "Cultural Crafts (textiles, pottery, woodworking)"

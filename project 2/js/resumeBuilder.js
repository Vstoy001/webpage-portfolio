var skills = ["html/css", "c++", "javascript", "objective C", "circuit design", "cooking"];

var bio = {
    "name": "Fry Guy",
    "welcome": "No web task is too big a pizza.",
    "location": "San Diego, CA",
    "role": "Front-end Web Developer",
    "contact": {
        "mobile": "888-888-8888",
        "email": "FryGuy@icloud.com",
        "github": "FGuy001",
        "twitter": "FGuy001@twitter.com",
        "blog": "Fry Guy's Pizzaria Styles"
    },
    "skills": skills,
    "picture": "images/fry.jpg"

};

var education = {
    "schools": [
        {
            "school": "Scripps Ranch High School",
            "location": "San Diego, CA",
            "major": "underwater basket weaving",
            "degree": "high school diploma",
            "date": "Sep 2010"
        },
        {
            "school": "University of California Riverside",
            "location": "Riverside, CA",
            "major": "Electrical Engineering",
            "degree": "BA",
            "date": "June 2014"
        }
    ],
    "online": [
        {
            "name": "Front End Web Development",
            "school": "Udacity",
            "date": "Feb 2015",
            "url": "https://www.udacity.com"
        },
        {
            "name": "Next level Pizza Making",
            "school": "Extreme Pizza",
            "date": "Jan 2009",
            "url": "http://www.superpizza.gov"
        }
    ]
};

var work = {
    "jobs": [
        {
            "employer": "Fry's Electronics",
            "position": "Tech Support",
            "location": "San Diego, CA",
            "date": "1/1/11 - 1/1/15",
            "description": "Assisted custumers in their need to find good functional equipment."
        },
        {
            "employer": "Death Star Incorporated",
            "position": "Stormtrooper",
            "location": "Las Vegas, NV",
            "date": "1/1/15 - 1/1/55",
            "description": "Helped build the death star. Designed and maintained launch bays for tie fighters."
        },
        {
            "employer": "Time Stream Bay",
            "position": "Time Traveller",
            "location": "Miami, FL",
            "date": "12/2/65 - 4/1/50",
            "description": "Got hired to travel through time, decided to try to save the death star."
        }
    ]
};

var project = {
    "projects": [
        {
            "title": "Great Pizza",
            "dates": "4/5/07 - 4/6/07",
            "description": "Made a pizza with the greatest toppings.",
            "image": "images/pizza.png"
        },
        {
            "title": "Motherboard",
            "dates": "1/2/10 - 4/2/10",
            "description": "Built a custom mother board for the LX-2000 computer case.",
            "image": "images/motherboard.png"
        },
        {
            "title": "Death Ray",
            "dates": "6/6/14-1/1/15",
            "description": "Built a death ray for self defense while walking at night. And keeping the neighbor's dog at bay.",
            "image": "images/raygun.png"
        }
    ]
};

bio.display = function () {

    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    $("#header").prepend(formattedRole);
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    $("#header").prepend(formattedName);

    var formattedPicture = HTMLbioPic.replace("%data%", bio.picture);
    $("#header").append(formattedPicture);

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);

        for (var item in bio.skills) {
            var formattedSkill = HTMLskills.replace("%data%", bio.skills[item]);
            $("#skills").append(formattedSkill);
        }
    }

    var formattedMobile = HTMLmobile.replace("%data%", bio.contact.mobile);
    $("#topContacts").append(formattedMobile);
    $("#letsConnect").append(formattedMobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contact.email);
    $("#topContacts").append(formattedEmail);
    $("#letsConnect").append(formattedEmail);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contact.twitter);
    $("#topContacts").append(formattedTwitter);
    $("#letsConnect").append(formattedTwitter);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contact.github);
    $("#topContacts").append(formattedGithub);
    $("#letsConnect").append(formattedGithub);
    var formattedBlog = HTMLblog.replace("%data%", bio.contact.blog);
    $("#topContacts").append(formattedBlog);
    $("#letsConnect").append(formattedBlog);
    var formattedLocation = HTMLlocation.replace("%data%", bio.location);
    $("#topContacts").append(formattedLocation);

    var formattedmotto = HTMLWelcomeMsg.replace("%data%", bio.welcome);
    $("#header").append(formattedmotto);
};

education.display = function () {
    for (var school in education.schools) {
        $("#education").append(HTMLschoolStart);

        var formattedName = HTMLschoolName.replace("%data%", education.schools[school].school);
        $(".education-entry:last").append(formattedName);

        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        $(".education-entry:last").append(formattedLocation);

        var formattedDate = HTMLschoolDates.replace("%data%", education.schools[school].date);
        $(".education-entry:last").append(formattedDate);

        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
        $(".education-entry:last").append(formattedMajor);

        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        $(".education-entry:last").append(formattedDegree);
    }

    $("#education").append(HTMLonlineClasses);

    for (var on in education.online) {
        $("#education").append(HTMLschoolStart);

        var formattedTitle = HTMLonlineTitle.replace("%data%", education.online[on].name);
        $(".education-entry:last").append(formattedTitle);

        var formattedSchool = HTMLonlineSchool.replace("%data%", education.online[on].school);
        $(".education-entry:last").append(formattedSchool);

        var formattedDate = HTMLonlineDates.replace("%data%", education.online[on].date);
        $(".education-entry:last").append(formattedDate);

        var formattedURL = HTMLonlineURL.replace("%data%", education.online[on].url);
        $(".education-entry:last").append(formattedURL);
    }
};

work.display = function () {
    for (var job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedPosition = HTMLworkTitle.replace("%data%", work.jobs[job].position);
        var formattedEmployerTitle = formattedEmployer + formattedPosition;
        $(".work-entry:last").append(formattedEmployerTitle);

        var formattedDuration = HTMLworkDates.replace("%data%", work.jobs[job].location);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].date);
        var formattedHistory = formattedDuration + formattedLocation;
        $(".work-entry:last").append(formattedHistory);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedDescription);
    }
};

project.display = function () {
    for (var proj in project.projects) {
        $("#projects").append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace("%data%", project.projects[proj].title);
        $(".project-entry:last").append(formattedTitle);

        var formattedDates = HTMLprojectDates.replace("%data%", project.projects[proj].dates);
        $(".project-entry:last").append(formattedDates);

        var formattedDescription = HTMLprojectDescription.replace("%data%", project.projects[proj].description);
        $(".project-entry:last").append(formattedDescription);

        var formattedImage = HTMLprojectImage.replace("%data%", project.projects[proj].image);
        $(".project-entry:last").append(formattedImage);
    }
};

$("#main").append(internationalizeButton);
$("#mapDiv").append(googleMap);

bio.display();
project.display();
education.display();
work.display();
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ keywords: [] }, (data) => {
        if (data.keywords.length === 0) {
            const defaultKeywords = [
                "CarryMinati","BB Ki Vines","Ashish Chanchlani",
                "Amit Bhadana","MostlySane","Harsh Beniwal","Slayy Point","Kanan Gill","Tanmay Bhat","Kenny Sebastian","Biswa Kalyan Rath",
                "Zakir Khan","Mallika Dua","The Timeliners","FilterCopy","TVF","All India Bakchod","Round2Hell","Niharika NM","Dolly Singh",
                "Technical Guruji","Geeky Ranjit","Technical Sagar","Sharmaji Technical","Trakin Tech","Tech Burner","C4ETech","Digital Deepak","Fone Arena",
                "Techno Ruhez","Mumbiker Nikhil","Flying Beast","Nomad Shubham","Sejal Kumar","Chai Time with Abhi and Niyu","Masoom Minawala","Komal Pandey",
                "Kusha Kapila","Shruti Arjun Anand","BeerBiceps","Nisha Madhulika","Chef Ranveer Brar","Kabita's Kitchen","VahChef","CookingShooking",
                "Chef Sanjeev Kapoor","Dhruv Rathee","Study IQ Education","Unacademy","Sandeep Maheshwari","Khan GS Research Centre","ExamFear Education",
                "Dr Vivek Bindra","The Lallantop","Mortal","Dynamo Gaming","Total Gaming","Jonathan Gaming","Mythpat","Sc0ut Gaming","Sanam","Yashraj Mukhate",
                "T-Series","Sony Music India","Zee Music Company","Saregama Music","CA Rachana Phadke Ranade","Pranjal Kamra","Finology","FinnovationZ",
                "India Today","Zee News","NDTV","Republic Bharat","Being Indian","India TV","News18 India","Aaj Tak","ScoopWhoop","Miss Malini",
                "Film Companion","The Quint","Beebom","Tech With Bani","Geek Unplugged","Kronten Gaming","Sanjeev Kapoor Khazana","Aashna Shroff",
                "Praveen Mohan","Debasree Banerjee","9xGamers","Gadget 360","Ankur Warikoo","Shivya Nath","Sumukhi Suresh","Srujan HP","CarryisLive",
                "Technical Duniya","Indian Food Factory","TechnoChef","FactTechz","Tina HAnalytics","Gaurav Chaudhary","Ladki Ki Ranjha","Kritika Khurana",
                "Radhika Seth","Pooja Luthra","Nashit Aziz","Rajat Kumar","Rashi Verma","Akash Gautam","Moffy", "Pankaj Tripathi","Abhishek Dubey",
                "World of Product Reviews","Maths By Anil Kumar","Vidya Rani","Great Indian Gaming","Viral Fashions","Ashoor Mirchi","Rohit Tiwari",
                "Say :- D","Natural Healing","Technical Arun","Sanjit Das","Wink Digital","Knowledge Science","Ratul Saha","StyleUp","Top 3ds",
                "Garima Srivastav","Surya N","Fitness By Ruchi","MakeInIndia","NomadHer","Dance With Dheera","Tanya G","Ayush Kaanal","Vijay Vishal",
                "ToonedIn","Baby Bharath","Bonds Fashions","Yogesh Bhatia","Jatin Chaudhary","Anita Analysis","Kitchenette","House of Rasna","Myriad Speak",
                "Tech Insiders","Celebrity Reels","Sachi V","DLSR Beat","Top 10","Vicky Rad","Amazing Seeker","Fitness Focus","HANS","HrpTV","Gomu Koti",
                "Life Review","Chic And Trendz","Home DeFragment","Spotlight TV","Kasturi","Namita Theresa","Innovation Hub","Hashtag Cube","Conscious Knowing",
                "LIVE By Ruckus","Sushma Review","True Facts","Tech Jaime","Score Techs","Deepak Style","TechnoAcumen","Creativity Cart","Aman Pandey",
                "Tiki Master","OTR Analyst","Leo Wonder","Radha Beauty","Skincare Planet","Sahab Official","Kritika Maheshwari","Ekam Luxury","Joey & Candie",
                "TDEE India","Kashvi Works","Harshity Trends","V Twin Official","iGyaan","Gadgets To Use","Tech With Pratik","Gamer Kafe","Chikoo Gaming",
                "F2N Gaming","King of Gaming","Desi Traveler","Nomadic Indian","Traveling Desi","India On Wheels","Exploring India","Wanderlust India",
                "Sambhavna Seth","Laughing Man","Nishant Tanwar","East India Comedy","Hebbars Kitchen","Madhura's Recipes","Archana's Kitchen",
                "Veg Recipes of India","Swasthi's Recipes","Food Food","Cook With Manali","Nafees Kitchen","Mansi Zaveri","Ankita Chaturvedi","Roshni Bhatia",
                "Style by Mehak","Fashion Funda","Desi Doll","The Fashionista","The Ranveer Show","Think School","Wifistudy","Etoos Education","Vedantu",
                "Byju's","Tips Official","Shemaroo Entertainment","9XM","MTV India","Bharatvaarta","Sadhguru","Art of Living","The Indian Express",
                "The Print","TeluguOne","Maa Stars","Tamil Tech","Bengali Vibes","Desi Vibes","The Art of Photography India","Creative India",
                "Indian Animations","Smart Reviews","Review360","The Honest Review","India Uncut","Indian Street Food","Gizmo Guide India",
                "NextGen Tech","Pixel Warriors","Game On India","Roaming India","Incredible India Vlogs","Comic India","Desi Hilarity","Spice It Up",
                "The Masala Diaries","Glam India","Beauty Baatein","Learn with Indian","Knowledge Junction","Bollywood Beats","Desi Tunes","India Insight",
                "Current Affairs India","Indian Canvas","Culture Club India","Startup India","Innovate India","Finance Wala","Money Matters India","Fit India",
                "Health Hub India","Inner Peace India","Mindful India","Tech Simplified India","Gadget Guru India","Indian Stand-Up","Urban Desi","Tadka Tales",
                "Exam Mastery India","India Today Live","Rhythm of India","Digital India Reviews","Trendy India","Daily Desi","Indian Sports Network",
                "Triggered Insaan","Mr. Indian Hacker","Elvish Yadav","Techno Gamerz","Indian Gaming League","Desi Pranks","Pranksters United","LOL India",
                "Haasya Ke Funde","Comedy Katta","Meme Sarkar","Jugaad Comedy","Desi Fails","Epic Desi Fails","Prank Gali","The Prank Junction","Meme Masala",
                "Comedy Wala","Fun Bites India","Freaky Desi","Viral Vortex India","Hilarious Hub","Desi Laugh Riot","Laughter Express","Masti Unlimited",
                "Gamer Zone India","Gaming Dhamaka","Prank Planet","Comedy Vortex","Loco Comedy","Crazy Desi","Desi Distraction","Chill Zone India",
                "Fool Around India","Desi Giggles","Joke Junction","Desi Vibe Zone","Meme Mania India","LOL Squad India","Funny Bones India","Giggle Factory",
                "Prank Beat","Desi Jokers","Chillax India","Crazy Vibes India","The Fun Factory","Viral Pranks India","Laugh Riot India","The Prank Lab",
                "Prank Squad India","Desi LOLs","Meme Zone India","Prank Dynasty","Desi Entertainers","Comic Desi","Humor Junction","Laff India","Joke Bazaar",
                "Desi Comedy Club","Prank King India","Gaming Madness India","Gamer Chillers India","Laughing Out Loud Desi","Fun Time Vlogs","Desi Vlog Squad",
                "Joke Central India","Prank Universe","Viral Entertainment India","Entertainment Junction","Comic Relief Zone","The Desi Pranksters",
                "Giggles & Gags India","Hilarious Desi","Desi Banta","LOL Masti","Viral Fails India","The Meme Squad","Laughter Lane India","Jokes on India",
                "The Laughter Club India","Gags Galore India","Desi Gags","Meme Masters India","Prankology India","The Prank Show","Comedy Circuit India",
                "The LOL Zone","Masti Maza India","Comic Relief Crew","Prankzilla India","LOLocity India","Gamer Gurus India","Fun Zone India",
                "Laugh Factory India","Desi Drollery","Meme Express India","Indian Gagsters","TikTok","Instagram","Facebook","Twitter","Snapchat",
                "Netflix","YouTube","Reddit","Meme","Viral","Trending","Binge","Prank","Comedy","Gaming","Vlogs","Lifestyle","Foodie","Fashion","Makeup",
                "Haul","Reaction","Unboxing","Chill","ASMR","DIY","Reels","Shorts","Dance","Music","Cover","Challenge","Review","Skits","Fails",
                "Influencer","Live","Stream","Cosplay","Gossip","Spoilers","Behind the Scenes","Tutorial","Workout","Motivation","Procrastination",
                "Time-waster","Clickbait","Viral Videos","Trend","Chillax","Hangout","Streamers","Vlogmas","Food Vlog","Travel","Wanderlust","Adventure",
                "Drama","Buzz","Confession","Reaction Videos","Sketch","Short Film","Lifestyle Vlog","Cooking","DIY Hacks","Fails Compilation","Epic","Clips",
                "Highlights","Compilation","Bloopers","Memes Compilation","Chill Music","Gaming Clips","Gameplays","Let’s Play","Walkthrough","Speedrun",
                "Esports","Parody","Spoof","Comic","Stand-Up","Comedy Skit","Prank Wars","Roast","Viral Moments","Social Experiment","Challenge Video",
                "Fake News","Rumors","Sensational","Shock","Entertainment","Distraction","Mindless","Humor","Escapism","Thugesh"


            ];

            chrome.storage.sync.set({ keywords: defaultKeywords }, () => {
                console.log("Default keywords added to storage.");
            });
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "resetKeywords") {
        chrome.storage.sync.set({ keywords: [] }, () => {
            chrome.runtime.onInstalled.dispatch(); // Trigger keyword reset
            chrome.runtime.sendMessage({ action: "keywordsReset" });
        });
    }
});

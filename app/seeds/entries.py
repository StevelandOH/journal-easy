from app.models import db, Entry


def seed_entries():

    entries = [
        Entry(prompt='Write a short dialogue based on your dream.',
              response='It was just a short car ride with my dad that has been dead for 11 years in his old Volkswagen rabbit. All he did was talk about the Scorpions, but it was something I needed since I forgot the sound of his voice for so many years. It seemed so vivid so it was like spending a little bit of time with the person I wanted to see the most in the world',
                     type='dream', date='4/16/2021', user_id=1),
        Entry(prompt='Write a short about what happens next in the dream.',
              response='It was just me and him, creeping around a swamp on a crisp fall morning. I don\'t remember if we shot anything, but when we got back to the road, and we put the guns back in the car, we just stood there, talking.',
                     type='dreamdream', date='4/17/2021', user_id=1),
        Entry(prompt='Describe a character or location from your dream.',
              response='A talented young herbalist who presents as a normal, polite, domestic sort of a person. Possibly autistic. Does not speak(inability or choice, no one knows).  He is found wandering in a hostile region and adopted ( in a "bringing home a stray dog" sort of way) by a cheerful young mercenary thug. They join up with the rest of the crew. The herbalist silently takes on the role of camp-keeper and cook without anyone ever discussing it.',
                     type='dream', date='4/18/2021', user_id=1),
        Entry(prompt='Describe the main emotion of your dream.',
              response='It was just me and him, creeping around a swamp on a crisp fall morning. I don\'t remember if we shot anything, but when we got back to the road, and we put the guns back in the car, we just stood there, talking.',
                     type='dream', date='4/19/2021', user_id=1),
        Entry(prompt='Write a short dialogue based on your dream.',
              response='It was just a short car ride with my dad that has been dead for 11 years in his old Volkswagen rabbit. All he did was talk about the Scorpions, but it was something I needed since I forgot the sound of his voice for so many years. It seemed so vivid so it was like spending a little bit of time with the person I wanted to see the most in the world',
                     type='dream', date='4/20/2021', user_id=1),
        Entry(prompt='Write a short about what happens next in the dream.',
              response='It was just me and him, creeping around a swamp on a crisp fall morning. I don\'t remember if we shot anything, but when we got back to the road, and we put the guns back in the car, we just stood there, talking.',
                     type='dream', date='4/21/2021', user_id=1),
        Entry(prompt='Describe a character or location from your dream.',
              response='It was just me and him, creeping around a swamp on a crisp fall morning. I don\'t remember if we shot anything, but when we got back to the road, and we put the guns back in the car, we just stood there, talking.',
                     type='dream', date='4/22/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel happy today',
              response='One of my friends that I hadn\'t talked to in a while texted and asked if I was doing okay',
                     type='journal', date='4/16/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel sad today',
              response='Watching my grandfather sit down at the table at dinner. He just looked so tired and in pain. He\'s a tough little guy though. Love my Pop Pop.',
                     type='journal', date='4/17/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel angry today',
              response='I had to explain to a co-worker five times the other day how to send an email from her phone. Each time she kept interrupting me saying the exact same thing, "But I don\'t have email on my phone, " almost proud that she didn\'t understand. Why buy a smartphone if you refuse to figure out how to use it?',
                     type='journal', date='4/18/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel frustrated today',
              response='This is rather vague, but people that are oblivious to their surroundings and other people. You know the ones, blocking the lane in the grocery store, unaware that other people might need to get past them, randomly stopping on a busy sidewalk to stare at some random thing, not signaling a turn until they are physically turning. Is it really that hard to be aware?',
                     type='journal', date='4/19/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel love today',
              response='She puts all my pills in a box separated by day, and checks to make sure I\'m taking them, makes sure I eat right, that I stay moving and urges me to go on a bike ride literally every time the phrase "what do you wanna do" comes up.',
                     type='journal', date='4/20/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel proud today',
              response='At age 25, I am completely financially independent. In 2012, I haven\'t taken a penny from my parents or the government, I have my own apartment, car, health insurance, dog, etc. that I pay for 100 % with money I earn from my job. I guess the reason why I am so proud of doing what everybody does is that my parents would be willing and able to pay for all of those things for me if I didn\'t feel like earning money myself.',
                     type='journal', date='4/21/2021', user_id=1),
        Entry(prompt='Describe one thing that made you feel anxious today',
              response='first day of school/first day of work things where you say your name and tell a few things about yourself. I rehearse it so many times in my head that I always spew out my words at 100 MPH.',
                     type='journal', date='4/22/2021', user_id=1),
        Entry(prompt='What is your favorite emotion to feel?',
              response='feeling proud of work I\'ve done',
                     type='gratitude', date='4/16/2021', user_id=1),
        Entry(prompt='What is your top goal?  Why is this goal important to you?',
              response='To find a great career with a good company to maintain happiness and be a positive impact on the world',
                     type='gratitude', date='4/17/2021', user_id=1),
        Entry(prompt='What fear are you currently facing?  How can you use this fear to your advantage?',
              response='Afriad of failure, It drives me to be the best possible version of myself most of the time.',
                     type='gratitude', date='4/18/2021', user_id=1),
        Entry(prompt='Look around the room and list all the items that you’re grateful for.',
              response='My bed, my doge, my entertainment, my work',
                     type='gratitude', date='4/19/2021', user_id=1),
        Entry(prompt='What do you love most about the current season?',
              response='The hope that spring brings',
                     type='gratitude', date='4/20/2021', user_id=1),
        Entry(prompt='What makes you happy when you’re feeling down.',
              response='Always my favorite thing in the word my puppy Reggie...',
                     type='gratitude', date='4/21/2021', user_id=1),
    ]

    for entry in entries:
        db.session.add(entry)

    db.session.commit()


def undo_entries():
    db.session.execute('TRUNCATE entries CASCADE;')
    db.session.commit()

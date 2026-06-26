export const EXERCISES = {
  gym: {
    label: "Gym Workouts", icon: "🏋️", color: "#185FA5", light: "#EEF4FF", border: "#B5D4F4",
    categories: {
      "Face & Neck": [
        { name: "Neck Press Machine", sets: 3, reps: 12, cal: 25, level: "Beginner", equipment: "Machine", notes: "Sit upright and press your forehead gently against the pad. Strengthens neck flexors and improves head posture. Move slowly — avoid jerky motions." },
        { name: "Jaw Resistance Pull", sets: 3, reps: 15, cal: 10, level: "Beginner", equipment: "Band", notes: "Loop a light band around your jaw and pull it away gently while resisting with your bite. Tones jaw muscles and improves facial structure. Keep tension light." },
        { name: "Neck Bridge", sets: 3, reps: 10, cal: 20, level: "Intermediate", equipment: "Bodyweight", notes: "Lie on your back, place the top of your head on the mat, and bridge up. Builds cervical strength and stability. Do NOT attempt without proper warm-up." },
        { name: "Lateral Neck Stretch", sets: 2, reps: 12, cal: 8, level: "Beginner", equipment: "None", notes: "Tilt your ear toward your shoulder and hold. Releases tension in the sternocleidomastoid. Breathe deeply and never force the stretch." },
      ],
      "Chest": [
        { name: "Flat Bench Press", sets: 4, reps: 10, cal: 80, level: "Intermediate", equipment: "Barbell", notes: "Lie flat, grip barbell slightly wider than shoulder-width. Lower to mid-chest, press up explosively. Retract shoulder blades and keep feet flat. Targets pectoralis major." },
        { name: "Incline Dumbbell Press", sets: 3, reps: 12, cal: 70, level: "Intermediate", equipment: "Dumbbell", notes: "Set bench at 30–45°. Press dumbbells up and slightly inward at the top. Focuses on the upper chest (clavicular head). Great for building that shelf look." },
        { name: "Cable Fly", sets: 3, reps: 15, cal: 55, level: "Beginner", equipment: "Cable", notes: "Stand between cables, bring handles together in a hugging arc. Maintains constant tension throughout. Ideal for isolating the chest and improving definition." },
        { name: "Chest Dip", sets: 3, reps: 12, cal: 65, level: "Intermediate", equipment: "Bars", notes: "Lean slightly forward on parallel bars and dip until elbows reach 90°. Works lower chest and triceps. Avoid flaring elbows out too wide." },
        { name: "Decline Bench Press", sets: 3, reps: 10, cal: 75, level: "Advanced", equipment: "Barbell", notes: "Set bench at 15–30° decline. Targets lower pec fibers. Feet should be secured. Keep core tight and avoid bouncing the bar off your chest." },
      ],
      "Back": [
        { name: "Lat Pulldown", sets: 4, reps: 12, cal: 75, level: "Beginner", equipment: "Cable", notes: "Grip bar wider than shoulders, pull to upper chest while leaning back slightly. Works the latissimus dorsi. Squeeze at the bottom and control the return." },
        { name: "Barbell Deadlift", sets: 4, reps: 6, cal: 110, level: "Advanced", equipment: "Barbell", notes: "Hip-hinge to grip the bar, drive through heels to stand tall. King of all compound lifts — works entire posterior chain. Keep bar close to body and spine neutral." },
        { name: "Seated Cable Row", sets: 3, reps: 12, cal: 70, level: "Beginner", equipment: "Cable", notes: "Sit upright, pull handle to lower chest, squeeze shoulder blades together. Builds mid-back thickness. Avoid rounding your lower back as you reach forward." },
        { name: "T-Bar Row", sets: 3, reps: 10, cal: 80, level: "Intermediate", equipment: "Barbell", notes: "Straddle the bar, hinge forward at hips, and row the weight to your chest. Great for mid-back and rhomboid density. Keep your chest on the pad if using a machine version." },
      ],
      "Shoulders": [
        { name: "Overhead Press", sets: 4, reps: 8, cal: 80, level: "Intermediate", equipment: "Barbell", notes: "Press barbell from upper chest to lockout overhead. Engages all three deltoid heads plus traps. Brace your core and avoid overarching your lower back." },
        { name: "Lateral Raise", sets: 3, reps: 15, cal: 45, level: "Beginner", equipment: "Dumbbell", notes: "Raise dumbbells to shoulder height with a slight elbow bend — like pouring a pitcher. Isolates the medial deltoid for shoulder width. Use lighter weights with strict form." },
        { name: "Arnold Press", sets: 3, reps: 12, cal: 65, level: "Intermediate", equipment: "Dumbbell", notes: "Start with palms facing you, rotate outward as you press up. Hits all three delt heads in one motion. Named after Arnold Schwarzenegger. Control the rotation." },
        { name: "Rear Delt Fly", sets: 3, reps: 15, cal: 40, level: "Beginner", equipment: "Cable", notes: "Bend forward at the hip, pull cables/dumbbells out and back. Targets the posterior deltoid and upper back. Critical for shoulder balance and posture correction." },
      ],
      "Arms": [
        { name: "Barbell Curl", sets: 3, reps: 12, cal: 50, level: "Beginner", equipment: "Barbell", notes: "Stand with a shoulder-width underhand grip, curl up without swinging. Works the biceps brachii. Keep elbows pinned to your sides throughout the movement." },
        { name: "Skull Crusher", sets: 3, reps: 12, cal: 55, level: "Intermediate", equipment: "EZ Bar", notes: "Lie on a bench, lower the EZ bar toward your forehead by hinging at elbows. Isolates the long head of the triceps. Keep upper arms vertical and fixed." },
        { name: "Preacher Curl", sets: 3, reps: 10, cal: 45, level: "Beginner", equipment: "Machine", notes: "Rest upper arms on the preacher pad, curl up with strict form. Eliminates momentum and fully isolates the biceps. Great for building peak and definition." },
        { name: "Tricep Pushdown", sets: 3, reps: 15, cal: 50, level: "Beginner", equipment: "Cable", notes: "Use a rope or straight bar, push down until elbows fully extend. Targets lateral head of the triceps. Keep elbows locked at your sides and fully extend each rep." },
      ],
      "Core": [
        { name: "Cable Crunch", sets: 3, reps: 20, cal: 40, level: "Beginner", equipment: "Cable", notes: "Kneel at a cable stack, crunch your elbows toward your knees against resistance. Loads the rectus abdominis with constant tension. Round your back — don't just bow at the hips." },
        { name: "Hanging Leg Raise", sets: 3, reps: 15, cal: 50, level: "Intermediate", equipment: "Bar", notes: "Hang from a pull-up bar and raise straight or bent legs to hip height. Works lower abs and hip flexors. Avoid swinging — control the descent." },
        { name: "Ab Wheel Rollout", sets: 3, reps: 10, cal: 45, level: "Advanced", equipment: "Ab Wheel", notes: "Kneel, roll the wheel forward as far as possible, then pull back. Challenges the entire core with a long lever. Stop if your lower back sags." },
        { name: "Oblique Crunch Machine", sets: 3, reps: 20, cal: 35, level: "Beginner", equipment: "Machine", notes: "Sit in the machine and rotate toward one knee at a time. Targets the obliques for a defined waist. Go through a full range of motion and resist on the way back." },
      ],
      "Legs": [
        { name: "Barbell Squat", sets: 4, reps: 8, cal: 110, level: "Advanced", equipment: "Barbell", notes: "Bar rests on upper traps, squat to parallel or below. The king of leg exercises — works quads, hamstrings, glutes, and core. Keep chest up and knees tracking over toes." },
        { name: "Leg Press", sets: 4, reps: 12, cal: 90, level: "Beginner", equipment: "Machine", notes: "Push the platform away by extending your knees. Targets quads primarily. Foot position varies the emphasis — higher = more glutes/hams, lower = more quads. Don't lock knees." },
        { name: "Leg Curl", sets: 3, reps: 15, cal: 60, level: "Beginner", equipment: "Machine", notes: "Curl your heels toward your glutes while lying or seated. Isolates the hamstrings. Squeeze at peak contraction and lower slowly to build hamstring strength and resilience." },
        { name: "Hack Squat", sets: 3, reps: 10, cal: 100, level: "Intermediate", equipment: "Machine", notes: "Feet on the platform, lower until thighs are parallel, then drive up. Focuses on quads without spinal load. Safer than barbell squats for beginners with back issues." },
        { name: "Calf Raise Machine", sets: 4, reps: 20, cal: 40, level: "Beginner", equipment: "Machine", notes: "Push through the balls of your feet to raise your heels. Works the gastrocnemius and soleus. Pause at the top for 1 second and get a full stretch at the bottom." },
      ],
      "Glutes": [
        { name: "Hip Thrust", sets: 4, reps: 12, cal: 75, level: "Intermediate", equipment: "Barbell", notes: "Rest upper back on a bench with barbell across hips. Drive hips up until body is level. Best glute builder available. Squeeze hard at the top and keep chin tucked." },
        { name: "Glute Kickback Machine", sets: 3, reps: 15, cal: 55, level: "Beginner", equipment: "Machine", notes: "Push the pad back and up with one leg while keeping hips square. Isolates the gluteus maximus. Move through full range and avoid compensating with the lower back." },
        { name: "Romanian Deadlift", sets: 3, reps: 10, cal: 80, level: "Intermediate", equipment: "Barbell", notes: "Hip-hinge with soft knees, lowering the bar along your legs until you feel a hamstring stretch. Excellent for glute-ham tie-in. Keep your back flat and core braced." },
        { name: "Cable Pull Through", sets: 3, reps: 15, cal: 60, level: "Beginner", equipment: "Cable", notes: "Face away from the cable, hinge at hips, then thrust forward to stand. Teaches perfect hip hinge pattern and fires glutes effectively. Great for beginners learning deadlift mechanics." },
      ],
      "Cardio": [
        { name: "Treadmill Run", sets: 1, reps: 30, cal: 300, level: "Beginner", equipment: "Treadmill", notes: "Run at a comfortable pace for 30 minutes. Elevates heart rate for fat burning and cardiovascular conditioning. Stay in the 65–75% max heart rate zone for best results." },
        { name: "Elliptical", sets: 1, reps: 25, cal: 250, level: "Beginner", equipment: "Elliptical", notes: "Low-impact cardio that mimics running without joint stress. Great for recovery days. Engage arms to increase calorie burn and maintain an upright posture." },
        { name: "Rowing Machine", sets: 1, reps: 20, cal: 220, level: "Intermediate", equipment: "Rower", notes: "Drive with your legs first, then lean back, then pull the handle to your lower chest. Works 86% of your muscles. Focus on proper sequencing — legs → core → arms." },
        { name: "Stairmaster", sets: 1, reps: 20, cal: 200, level: "Intermediate", equipment: "Stairmaster", notes: "Step at a steady pace, don't lean heavily on the rails. Fires glutes, quads, and calves while raising the heart rate. Excellent for building lower body endurance." },
      ],
    }
  },
  calisthenics: {
    label: "Calisthenics", icon: "🤸", color: "#993556", light: "#FBEAF0", border: "#ED93B1",
    categories: {
      "Face & Neck": [
        { name: "Neck Bridge", sets: 3, reps: 10, cal: 18, level: "Intermediate", equipment: "Bodyweight", notes: "Lie on your back and support your weight on top of your head. Builds cervical spine resilience. Warm up your neck thoroughly before attempting this movement." },
        { name: "Chin Tuck", sets: 3, reps: 15, cal: 8, level: "Beginner", equipment: "None", notes: "Pull your chin straight back to create a 'double chin.' Corrects forward head posture and strengthens deep neck flexors. Hold 3–5 seconds each rep." },
        { name: "Head Roll", sets: 2, reps: 10, cal: 6, level: "Beginner", equipment: "None", notes: "Gently roll your head in a half-circle from shoulder to shoulder. Releases tension in the neck and traps. Skip the back portion of the roll to protect the cervical spine." },
        { name: "Jaw Resistance Push", sets: 3, reps: 12, cal: 10, level: "Beginner", equipment: "Hands", notes: "Press your hand against your chin and resist with your jaw muscles. Tones the masseter and neck muscles. Use moderate pressure only." },
      ],
      "Upper Body": [
        { name: "Push-Up", sets: 4, reps: 20, cal: 60, level: "Beginner", equipment: "Bodyweight", notes: "Place hands shoulder-width apart, lower chest to the floor, push back up. Works chest, triceps, and core. Keep your body in a straight plank — don't let hips sag." },
        { name: "Pull-Up", sets: 4, reps: 10, cal: 70, level: "Intermediate", equipment: "Bar", notes: "Overhand grip on a bar, pull until chin clears. Builds back width and arm strength. Full dead-hang start and controlled lowering builds the most muscle." },
        { name: "Diamond Push-Up", sets: 3, reps: 15, cal: 55, level: "Intermediate", equipment: "Bodyweight", notes: "Form a diamond shape with your hands under your chest. Intensely targets the triceps and inner chest. Easier to keep back straight than regular push-ups." },
        { name: "Pike Push-Up", sets: 3, reps: 12, cal: 50, level: "Intermediate", equipment: "Bodyweight", notes: "Hips raised high in an inverted V, lower your head toward the floor. Mimics the overhead press using bodyweight. Foundation for progressing to a handstand push-up." },
        { name: "Dip", sets: 3, reps: 15, cal: 65, level: "Intermediate", equipment: "Parallel Bars", notes: "Lower yourself between parallel bars until elbows reach 90°, then press back up. Hits triceps and chest. Lean forward for more chest, stay upright for more triceps." },
      ],
      "Core & Abs": [
        { name: "Plank", sets: 3, reps: 60, cal: 35, level: "Beginner", equipment: "Bodyweight", notes: "Hold a push-up position on forearms and toes. Builds core endurance and spinal stability. Keep hips level — don't let them rise or sag. Breathe steadily throughout." },
        { name: "L-Sit", sets: 3, reps: 20, cal: 45, level: "Advanced", equipment: "Bars", notes: "Support yourself on bars with legs extended straight out in front. Demands tremendous core and hip flexor strength. Build up with bent-knee holds first." },
        { name: "Dragon Flag", sets: 3, reps: 8, cal: 55, level: "Advanced", equipment: "Bench", notes: "Grip a bench overhead, keep your body rigid and lower it slowly like a lever. One of the hardest core exercises. Progress from tuck version to full extension." },
        { name: "Hollow Body Hold", sets: 3, reps: 30, cal: 40, level: "Intermediate", equipment: "Bodyweight", notes: "Lie on your back, press lower back to the floor, and raise arms and legs. Foundation of all gymnastics movement. Maintain constant posterior pelvic tilt." },
      ],
      "Legs & Glutes": [
        { name: "Pistol Squat", sets: 3, reps: 8, cal: 65, level: "Advanced", equipment: "Bodyweight", notes: "Stand on one leg and squat all the way down while keeping the other leg straight out. Demands strength, balance, and mobility. Use a support until you build confidence." },
        { name: "Jump Squat", sets: 3, reps: 15, cal: 70, level: "Intermediate", equipment: "Bodyweight", notes: "Squat down then explode upward as high as possible, landing softly. Builds explosive leg power and burns significant calories. Land toe-to-heel to protect knees." },
        { name: "Walking Lunge", sets: 3, reps: 20, cal: 55, level: "Beginner", equipment: "Bodyweight", notes: "Step forward, lower your back knee toward the floor, then step through. Works quads, glutes, and improves coordination. Keep torso upright and step long enough." },
        { name: "Nordic Curl", sets: 3, reps: 8, cal: 60, level: "Advanced", equipment: "Bar", notes: "Kneel with feet anchored, lower your body toward the floor using hamstrings only. Incredibly effective for hamstring strength. Use hands to catch yourself at the bottom." },
      ],
      "Skill Moves": [
        { name: "Muscle-Up", sets: 3, reps: 5, cal: 80, level: "Advanced", equipment: "Bar", notes: "Pull up explosively past the bar and transition into a dip at the top. Combines pull-up and dip into one fluid movement. Master the kip or strict version progressively." },
        { name: "Handstand Hold", sets: 3, reps: 30, cal: 50, level: "Advanced", equipment: "Wall", notes: "Kick up against a wall and hold a straight handstand. Builds shoulder strength and body awareness. Work toward wall-facing handstands for better alignment." },
        { name: "Front Lever", sets: 3, reps: 15, cal: 70, level: "Advanced", equipment: "Bar", notes: "Hang from a bar and hold your body horizontal, face up. Tests full-body tension and lat strength. Tuck, one-leg, and straddle progressions lead to the full lever." },
        { name: "Human Flag Progression", sets: 3, reps: 10, cal: 75, level: "Advanced", equipment: "Pole", notes: "Hold a vertical pole and extend body horizontally to the side. Works obliques, lats, and shoulders maximally. Begin with incline holds and gradually flatten your body." },
      ],
      "Athletic Drills": [
        { name: "Burpee", sets: 4, reps: 15, cal: 90, level: "Intermediate", equipment: "Bodyweight", notes: "Squat down, jump feet back to plank, do a push-up, jump feet forward, then jump up. Full-body conditioning drill that skyrockets heart rate. Keep a steady, sustainable pace." },
        { name: "Box Jump", sets: 4, reps: 10, cal: 75, level: "Intermediate", equipment: "Box", notes: "Swing arms, bend knees, and explode onto a box. Develops explosive lower-body power. Land softly with bent knees and step — don't jump — back down." },
        { name: "Bear Crawl", sets: 3, reps: 20, cal: 60, level: "Beginner", equipment: "Bodyweight", notes: "On all fours with knees hovering, crawl forward alternating opposite hand and foot. Builds core stability, coordination, and shoulder strength. Keep back flat." },
        { name: "Sprint Drill", sets: 6, reps: 1, cal: 80, level: "Intermediate", equipment: "Open Space", notes: "Sprint at maximum effort for 20–40 meters, then walk back to recover. Builds fast-twitch muscle fibers and metabolic power. Full effort every sprint is key." },
      ],
      "Mobility & Stretch": [
        { name: "Hip Flexor Stretch", sets: 2, reps: 30, cal: 10, level: "Beginner", equipment: "None", notes: "Kneel on one knee in a lunge position and push hips forward gently. Counteracts prolonged sitting. Hold 30 seconds each side and breathe into the stretch." },
        { name: "Shoulder Dislocate", sets: 3, reps: 10, cal: 12, level: "Beginner", equipment: "Band", notes: "Hold a band with a wide grip and pass it over your head and behind your back. Improves shoulder mobility and prevents injury. Keep arms straight and grip wide." },
        { name: "Wrist Prep Circles", sets: 2, reps: 20, cal: 8, level: "Beginner", equipment: "None", notes: "Rotate wrists in large circles both directions. Essential warm-up for push-based calisthenics. Don't skip this — most wrist injuries stem from poor prep." },
        { name: "Ankle Mobility Drill", sets: 2, reps: 15, cal: 10, level: "Beginner", equipment: "None", notes: "Sit or stand and draw large circles with your foot at the ankle. Improves squat depth and landing mechanics. Critical for pistol squat progression." },
      ],
      "HIIT Circuits": [
        { name: "Tabata (20/10)", sets: 8, reps: 1, cal: 120, level: "Advanced", equipment: "Bodyweight", notes: "20 seconds max effort, 10 seconds rest — repeated 8 rounds (4 min total). Scientifically proven to boost VO2 max. Choose one exercise and go all-out every round." },
        { name: "EMOM Push-Up", sets: 10, reps: 10, cal: 100, level: "Intermediate", equipment: "Bodyweight", notes: "Every minute on the minute: 10 push-ups, then rest for remainder of the minute. Builds work capacity and upper body endurance. Scale reps if you can't complete in time." },
        { name: "AMRAP Burpee", sets: 1, reps: 15, cal: 130, level: "Advanced", equipment: "Bodyweight", notes: "As many rounds as possible in a set time. Push the pace while maintaining clean form. Track your round count and aim to beat it next session." },
      ],
    }
  },
  home: {
    label: "Home Workouts", icon: "🏠", color: "#3B6D11", light: "#EAF3DE", border: "#C0DD97",
    categories: {
      "Face & Neck": [
        { name: "Face Yoga Sequence", sets: 1, reps: 10, cal: 12, level: "Beginner", equipment: "None", notes: "A series of facial exercises that tone and lift facial muscles. Helps reduce tension and improve circulation in the face. Hold each expression for 5 seconds." },
        { name: "Forehead Smoother", sets: 3, reps: 15, cal: 6, level: "Beginner", equipment: "None", notes: "Place fingers on forehead and try to raise your eyebrows against the resistance. Tones the frontalis muscle. A gentle daily habit for improving facial muscle tone." },
        { name: "Cheek Puff & Release", sets: 3, reps: 20, cal: 8, level: "Beginner", equipment: "None", notes: "Puff air into one cheek, transfer to the other, then release. Tones the buccinator muscles of the cheeks. Simple and effective for facial definition." },
        { name: "Eye Focus Drill", sets: 2, reps: 10, cal: 5, level: "Beginner", equipment: "None", notes: "Look left, right, up, down, and diagonally — hold each for 2 seconds. Reduces digital eye strain and tones the extraocular muscles. Do this every morning." },
        { name: "Neck Tilt Stretch", sets: 2, reps: 12, cal: 7, level: "Beginner", equipment: "None", notes: "Tilt your head and gently stretch the opposite side of your neck. Relieves tension from prolonged screen time. Use your hand for a gentle extra pull." },
      ],
      "Upper Body": [
        { name: "Push-Up", sets: 3, reps: 15, cal: 50, level: "Beginner", equipment: "None", notes: "Classic upper-body builder — hands at shoulder width, body in a plank, lower and press. Works chest, triceps, and core. Ideal for beginners before progressing to harder variations." },
        { name: "Chair Tricep Dip", sets: 3, reps: 12, cal: 40, level: "Beginner", equipment: "Chair", notes: "Place hands on a chair edge behind you and lower until elbows reach 90°. Targets the triceps. Keep hips close to the chair and elbows pointing straight back." },
        { name: "Wall Push-Up", sets: 3, reps: 20, cal: 30, level: "Beginner", equipment: "Wall", notes: "Push-up performed at an angle against a wall — easiest push-up variation. Perfect for complete beginners or injury rehabilitation. Great for warming up the chest and shoulders." },
        { name: "Shoulder Tap", sets: 3, reps: 20, cal: 35, level: "Beginner", equipment: "None", notes: "In a push-up position, tap opposite shoulder with each hand. Builds shoulder stability and anti-rotation core strength. Keep hips level and resist twisting." },
      ],
      "Core & Abs": [
        { name: "Crunch", sets: 3, reps: 25, cal: 35, level: "Beginner", equipment: "None", notes: "Lie on your back, hands behind head, curl your upper back off the floor. Targets the upper abs. Avoid pulling your neck — focus on curling through the rib cage." },
        { name: "Bicycle Crunch", sets: 3, reps: 20, cal: 40, level: "Beginner", equipment: "None", notes: "Alternate bringing elbow to opposite knee in a pedaling motion. Hits the obliques and rectus abdominis together. Slow, controlled reps beat fast sloppy ones." },
        { name: "Plank Hold", sets: 3, reps: 45, cal: 30, level: "Beginner", equipment: "None", notes: "Hold a straight-arm or forearm plank with a rigid body. Builds core endurance. Squeeze glutes and thighs — a plank is a full-body brace, not just abs." },
        { name: "Russian Twist", sets: 3, reps: 20, cal: 38, level: "Beginner", equipment: "None", notes: "Sit with knees bent, lean back slightly, and rotate side to side. Works the obliques and improves rotational strength. Add a water bottle for extra resistance." },
        { name: "Leg Raise", sets: 3, reps: 15, cal: 35, level: "Intermediate", equipment: "None", notes: "Lie flat, keep legs straight, and raise them to 90° then lower slowly. Targets the lower abs and hip flexors. Press your lower back into the floor throughout." },
      ],
      "Legs & Glutes": [
        { name: "Bodyweight Squat", sets: 3, reps: 20, cal: 55, level: "Beginner", equipment: "None", notes: "Feet shoulder-width apart, squat to parallel while keeping chest tall. Foundational lower-body movement. Build the habit of 'knees out' and 'weight in heels'." },
        { name: "Reverse Lunge", sets: 3, reps: 16, cal: 50, level: "Beginner", equipment: "None", notes: "Step back and lower your rear knee toward the floor. Easier on the knees than forward lunges. Works quads, glutes, and improves single-leg stability." },
        { name: "Glute Bridge", sets: 3, reps: 20, cal: 45, level: "Beginner", equipment: "None", notes: "Lie on your back, push through heels to raise hips off the floor. Best beginner glute activator. Hold at the top for 2 seconds and feel the glute contraction." },
        { name: "Wall Sit", sets: 3, reps: 45, cal: 40, level: "Beginner", equipment: "Wall", notes: "Back against wall, thighs parallel to the floor — hold the position. Burns the quads and improves muscular endurance. Aim for longer holds each session." },
        { name: "Calf Raise", sets: 3, reps: 25, cal: 30, level: "Beginner", equipment: "None", notes: "Stand on the edge of a step and raise up on your toes then lower fully. Works gastrocnemius and soleus. Slow and controlled beats fast and sloppy here." },
      ],
      "Full Body": [
        { name: "Burpee", sets: 3, reps: 12, cal: 80, level: "Intermediate", equipment: "None", notes: "The ultimate full-body conditioning drill — squat, plank, push-up, jump. Burns maximum calories in minimal time. Pace yourself — form matters more than speed." },
        { name: "Mountain Climber", sets: 3, reps: 30, cal: 65, level: "Intermediate", equipment: "None", notes: "Drive knees alternately toward your chest from a plank. Engages core, shoulders, and elevates heart rate. Keep hips low and maintain a steady rhythm." },
        { name: "Inchworm", sets: 3, reps: 10, cal: 50, level: "Beginner", equipment: "None", notes: "Stand, fold to the floor, walk hands out to a plank, walk feet back, stand. Warms up the entire body and stretches the hamstrings. Perfect as a warm-up drill." },
        { name: "Bear Crawl", sets: 3, reps: 20, cal: 60, level: "Beginner", equipment: "None", notes: "All fours with knees hovering, crawl forward and backward alternating limbs. Improves coordination, builds core stability, and works the shoulders. Keep hips low." },
      ],
      "Stretching": [
        { name: "Morning Full Stretch", sets: 1, reps: 10, cal: 15, level: "Beginner", equipment: "None", notes: "A full-body stretch sequence done in the morning to wake up muscles and joints. Improves circulation and flexibility. Hold each stretch 20–30 seconds minimum." },
        { name: "Hip Flexor Hold", sets: 2, reps: 30, cal: 10, level: "Beginner", equipment: "None", notes: "Kneel in a deep lunge and hold with hips square. Essential for countering sitting. Breathe slowly and let the stretch deepen over time — don't force it." },
        { name: "Spinal Twist", sets: 2, reps: 10, cal: 8, level: "Beginner", equipment: "None", notes: "Lie on your back and drop both knees to one side while shoulders stay flat. Relieves lower back tension and improves spinal mobility. Hold 30 seconds each side." },
        { name: "Cool-Down Flow", sets: 1, reps: 8, cal: 12, level: "Beginner", equipment: "None", notes: "A gentle sequence of holds and transitions to bring heart rate down post-workout. Reduces next-day soreness and promotes recovery. Never skip your cool-down." },
      ],
      "Light Equipment": [
        { name: "Dumbbell Curl", sets: 3, reps: 15, cal: 45, level: "Beginner", equipment: "Dumbbell", notes: "Stand with dumbbells at your sides and curl alternately. Classic bicep builder. Keep elbows pinned to your sides and avoid using momentum to swing the weight up." },
        { name: "Resistance Band Row", sets: 3, reps: 15, cal: 40, level: "Beginner", equipment: "Band", notes: "Anchor a band, grab both ends, and row to your sides. Targets the mid-back and rear delts. Excellent for posture. Squeeze shoulder blades together at the end of each rep." },
        { name: "Kettlebell Swing", sets: 4, reps: 15, cal: 80, level: "Intermediate", equipment: "Kettlebell", notes: "Hinge at the hips and swing the kettlebell up to chest height using glute power. A phenomenal fat-burning and posterior chain drill. It's a hip hinge — NOT a squat." },
        { name: "Jump Rope", sets: 3, reps: 60, cal: 90, level: "Beginner", equipment: "Jump Rope", notes: "Jump continuously for 60 seconds. Improves coordination, agility, and cardiovascular fitness. Land softly on the balls of your feet and keep jumps small and efficient." },
      ],
      "Quick Workouts": [
        { name: "5-Min Express", sets: 1, reps: 5, cal: 40, level: "Beginner", equipment: "None", notes: "A quick circuit of 5 exercises with no rest — perfect for busy days. Better than doing nothing. Choose compound moves like squats, push-ups, and planks." },
        { name: "10-Min Full Body", sets: 1, reps: 10, cal: 80, level: "Beginner", equipment: "None", notes: "10 exercises, 45 seconds each, 15 seconds rest. Hits all major muscle groups efficiently. Ideal for maintaining fitness when time is limited. Go at your own pace." },
        { name: "20-Min Fat Burn", sets: 1, reps: 20, cal: 160, level: "Intermediate", equipment: "None", notes: "High-intensity circuit with cardio and strength moves alternating. Elevates metabolism for hours after. Push hard for maximum afterburn effect — this should not be easy." },
      ],
    }
  }
};

export const YOGA_DATA = {
  Hatha: {
    color: "#1D9E75", light: "#E1F5EE",
    poses: [
      { name: "Mountain Pose", duration: 60, level: "Beginner", benefit: "Posture & grounding" },
      { name: "Warrior I", duration: 45, level: "Beginner", benefit: "Strength & focus" },
      { name: "Triangle Pose", duration: 45, level: "Beginner", benefit: "Balance & stretch" },
      { name: "Tree Pose", duration: 60, level: "Beginner", benefit: "Balance & stability" },
      { name: "Child's Pose", duration: 90, level: "Beginner", benefit: "Rest & release" },
    ]
  },
  Vinyasa: {
    color: "#378ADD", light: "#EEF4FF",
    poses: [
      { name: "Sun Salutation A", duration: 120, level: "Beginner", benefit: "Full body warm-up" },
      { name: "Warrior II Flow", duration: 60, level: "Intermediate", benefit: "Strength & flow" },
      { name: "Chaturanga", duration: 30, level: "Intermediate", benefit: "Core & arms" },
      { name: "Downward Dog", duration: 60, level: "Beginner", benefit: "Hamstrings & spine" },
      { name: "Pigeon Pose", duration: 90, level: "Intermediate", benefit: "Hip opening" },
    ]
  },
  Yin: {
    color: "#7F77DD", light: "#EEEDFE",
    poses: [
      { name: "Dragon Pose", duration: 180, level: "Beginner", benefit: "Deep hip flexor" },
      { name: "Butterfly", duration: 180, level: "Beginner", benefit: "Inner thigh release" },
      { name: "Shoelace", duration: 180, level: "Intermediate", benefit: "IT band & outer hip" },
      { name: "Saddle Pose", duration: 120, level: "Intermediate", benefit: "Quad & spine" },
      { name: "Melting Heart", duration: 180, level: "Beginner", benefit: "Chest & shoulder" },
    ]
  },
  Power: {
    color: "#D85A30", light: "#FAECE7",
    poses: [
      { name: "Chair Pose", duration: 45, level: "Intermediate", benefit: "Leg & core power" },
      { name: "Boat Pose", duration: 45, level: "Intermediate", benefit: "Core strength" },
      { name: "Crow Pose", duration: 30, level: "Advanced", benefit: "Arm balance" },
      { name: "Side Plank", duration: 30, level: "Intermediate", benefit: "Lateral core" },
      { name: "Handstand Prep", duration: 60, level: "Advanced", benefit: "Full body strength" },
    ]
  }
};

export const FOOD_DB = [
  { name: "Oatmeal (1 cup)", cal: 154, protein: 5, carbs: 27, fat: 3 },
  { name: "Banana", cal: 89, protein: 1, carbs: 23, fat: 0 },
  { name: "Chicken Breast (100g)", cal: 165, protein: 31, carbs: 0, fat: 4 },
  { name: "Brown Rice (1 cup)", cal: 216, protein: 5, carbs: 45, fat: 2 },
  { name: "Egg (1 whole)", cal: 78, protein: 6, carbs: 1, fat: 5 },
  { name: "Whey Protein Shake", cal: 120, protein: 24, carbs: 3, fat: 2 },
  { name: "Greek Yogurt (100g)", cal: 59, protein: 10, carbs: 4, fat: 0 },
  { name: "Almonds (30g)", cal: 174, protein: 6, carbs: 6, fat: 15 },
  { name: "Salmon (100g)", cal: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "Sweet Potato (medium)", cal: 103, protein: 2, carbs: 24, fat: 0 },
  { name: "Avocado (half)", cal: 120, protein: 1, carbs: 6, fat: 11 },
  { name: "Whole Milk (1 cup)", cal: 149, protein: 8, carbs: 12, fat: 8 },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

document.getElementById('next-1').addEventListener('click', () => {
  document.getElementById('step-1').classList.add('hidden');
  document.getElementById('step-2').classList.remove('hidden');
});

document.getElementById('next-2').addEventListener('click', () => {
  const selectedCategories = Array.from(document.querySelectorAll('#categories input:checked')).map(input => input.value);
  if (selectedCategories.length > 3) {
    alert('You can select up to 3 categories only.');
    return;
  }
  document.getElementById('step-2').classList.add('hidden');
  document.getElementById('step-3').classList.remove('hidden');
  
  const pseudoname = document.getElementById('pseudoname').value || 'Anonymous';
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const frequency = document.getElementById('frequency').value;
  const schoolLevel = document.getElementById('school-level').value;
  const email = document.getElementById('email').value;

  const summary = `
    Pseudoname: ${pseudoname}<br>
    Age: ${age}<br>
    Gender: ${gender}<br>
    Frequency of Watching Anime: ${frequency}<br>
    School/Work Level: ${schoolLevel}<br>
    Email: ${email}<br>
    Selected Categories: ${selectedCategories.join(', ')}
  `;
  document.getElementById('summary').innerHTML = summary;
});

document.getElementById('survey-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const pseudoname = document.getElementById('pseudoname').value || 'Anonymous';
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const frequency = document.getElementById('frequency').value;
  const schoolLevel = document.getElementById('school-level').value;
  const email = document.getElementById('email').value;
  const selectedCategories = Array.from(document.querySelectorAll('#categories input:checked')).map(input => input.value);

  const data = [pseudoname, age, gender, frequency, schoolLevel, email, selectedCategories.join(', ')];

  try {
    const response = await fetch('http://localhost:3000/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      alert('Survey submitted successfully!');
    } else {
      alert('Failed to submit survey.');
    }
  } catch (error) {
    console.error('Error submitting survey:', error);
    alert('An error occurred while submitting the survey.');
  }
});

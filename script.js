document.addEventListener('DOMContentLoaded', function () {
    const addInputButton = document.getElementById('addInputButton'),
        removeEmpty = document.getElementById('removeEmpty'),
        inputContainer = document.getElementById('inputContainer'),
        gpaDisplay = document.getElementById('gpaDisplay');
        calc = document.getElementById('CalculateGWA');

    let subjectCount = 1;

    addInputButton.addEventListener('click', function () {
        const label1 = document.createElement('label');
        label1.textContent = 'Subject ' + subjectCount + ':';
        label1.style.color = 'aliceblue';
        inputContainer.appendChild(label1);

        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Grade';
        input.setAttribute('min', '0');
        input.setAttribute('max', '100');
        input.style.margin = '2px';
        inputContainer.appendChild(input);

        const input2 = document.createElement('input');
        input2.type = 'number';
        input2.placeholder = 'Unit/s';
        input2.setAttribute('min', '1');
        input2.setAttribute('step', '1');
        input2.style.margin = '10px';
        inputContainer.appendChild(input2);

        subjectCount++;
    });

    calc.addEventListener('click', function () {
        // Check if there are inputs before calculating
        const inputs = inputContainer.querySelectorAll('input[type="number"]');
        if (inputs.length === 0) {
            // Show error message
            gpaDisplay.textContent = 'Please add at least one subject.';
            gpaDisplay.style.color = 'aliceblue';
        } else {
            calculateGWA();
        }
    });

    removeEmpty.addEventListener('click', function () {
        inputContainer.innerHTML = '';
        subjectCount = 1;
        gpaDisplay.textContent = '';
    });

    function cleanInput(inputElement) {
        this.value = this.value.replace(/[^0-9.]/g, '');
    }

    function calculateGWA() {
        const grades = inputContainer.querySelectorAll('input[type="number"]:nth-of-type(2n-1)'),
            units = inputContainer.querySelectorAll('input[type="number"]:nth-of-type(2n)');

        let totalGradePoints = 0,
            totalUnits = 0;

        grades.forEach((gradeInput, index) => {
            const grade = parseFloat(gradeInput.value),
                unit = parseInt(units[index].value);

            !isNaN(grade) && grade >= 0 && grade <= 100 && unit > 0 && (
                totalGradePoints += grade * unit,
                totalUnits += unit
            );
        });

        const gwa = totalGradePoints / totalUnits;
        gpaDisplay.textContent = 'GWA: ' + gwa.toFixed(4);
        gpaDisplay.style.color = 'aliceblue';
    }
});

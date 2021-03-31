import { toggleGratModal, toggleDreamModal } from '../components/Morning/index';
import { toggleJournal } from '../components/DailyJournal/index';

const dreamEntry = {
    type: 'dream',
    toggle: toggleDreamModal,
    title: 'The Dream Journal',
    prompt:
        'Talk a little about your dream, what emotions did they make you feel?',
};

const gratitudeEntry = {
    type: 'gratitude',
    toggle: toggleGratModal,
    title: 'The Dream Journal',
    prompt:
        'Talk a little about your dream, what emotions did they make you feel?',
};

const journalEntry = {
    type: 'journal',
    toggle: toggleJournal,
    title: 'The Dream Journal',
    prompt:
        'Talk a little about your dream, what emotions did they make you feel?',
};

export default { dreamEntry, journalEntry, gratitudeEntry };

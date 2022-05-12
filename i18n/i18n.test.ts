import {i18n, ReturnObjType} from './i18n';

let sourceStrings;
let t: ReturnObjType;

beforeEach(() => {
    sourceStrings = {
        hello: "Добрый вечор, {username}!",
        admin: {
            objectForm: {
                label: 'Пароль администратора',
                hint: 'Не менее {minLength} символов. Сейчас - {length}'
            }
        }
    }
    t = i18n(sourceStrings)
})

test('testFormat', () => {

    expect(t.hello({username: 'me'})).toBe('Добрый вечор, me!');
});

test('testDepth', () => {
    expect(t.admin.objectForm.label()).toBe('Пароль администратора');
});

test('testDepthFmt', () => {
    expect(t.admin.objectForm.hint({length: 6, minLength: 8})).toBe('Не менее 8 символов. Сейчас - 6');
});




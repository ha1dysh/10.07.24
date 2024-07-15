/*
1. Напишите функцию myFilter (и обработчики правил для нее) которая будет фильтровать список на основании переданных правил.
*/

type TArticle = { id: number; title: string; text: string }

const articles: TArticle[] = [
  { id: 1, "title": "justo. Praesent luctus. Curabitur", "text": "sapieen, gravida non, sollicitudin a," },
  { id: 2, "title": "quam quis diam. Pellentesque", "text": "eu odio tristique pharetra. Quisque ac" },
  { id: 3, "title": "quis lectus. Nullam suscipit,", "text": "bibendum. Donec felis orci, adipiscing non, luctus sit" },
  { id: 4, "title": "Cras dolor dolor, tempus", "text": "eget magna. Suspendisse tristique neque" },
  { id: 5, "title": "ut dolor dapibus gravida.", "text": "ultricies adipiscing, enim mi tempor lorem, eget mollis" },
  { id: 6, "title": "elit. Etiam laoreet, libero", "text": "eget metus eu erat semper rutrum." },
  { id: 7, "title": "velit eu sem. Pellentesque", "text": "Aliquam auctor, velit eget laoreet posuere, enim nisl elementum" },
  { id: 8, "title": "Aliquam ultrices iaculis odio.", "text": "ligula consectetuer rhoncus. Nullam velit dui, semper et," },
  { id: 9, "title": "a nunc. In at", "text": "semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices" },
  { id: 10, "title": "iaculis quis, pede. Praesent", "text": "mi. Aliquam gravida mauris ut mi. Duis risus" }
]

const FILTER_OPERATORS = {
  AND: 'AND',
  OR: 'OR'
}


type TRules = {
  key: 'title' | 'text'
  rule: keyof typeof ruleHandlers
  params: string[] | RegExp[]
}

const textLikeRule: TRules = { key: 'text', rule: 'like', params: ['mollis'] }
const titleStartLikeRule: TRules = { key: 'title', rule: 'sLike', params: ['ve'] }
const titleEndLikeRule: TRules = { key: 'title', rule: 'eLike', params: ['ur'] }
const textRegExpRule: TRules = { key: 'text', rule: 'regExp', params: [new RegExp('[e]{2}')] }

type TTextHandler = (params: string[], value: string) => boolean
type TRegExpHandler = (params: RegExp[], value: string) => boolean

const handlerLikeRule: TTextHandler = (params, value) => params.some(param => value.includes(param))
const handlerSLikeRule: TTextHandler = (params, value) => params.some(param => value.startsWith(param))
const handlerELikeRule: TTextHandler = (params, value) => params.some(param => value.endsWith(param))
const handlerRegExpRule: TRegExpHandler = (params, value) => params.some(param => param.test(value))

const ruleHandlers = {
  'like': handlerLikeRule,
  'sLike': handlerSLikeRule,
  'eLike': handlerELikeRule,
  'regExp': handlerRegExpRule,
}

const myFilter = (handlers: typeof ruleHandlers) => (
  items: TArticle[],
  rules: TRules[],
  operator = FILTER_OPERATORS.OR
): TArticle[] => {
  const res = []

  for (const item of items) {
    let andChecks = []

    for (const rule of rules) {
      const ruleFn = handlers[rule.rule]
      const params = rule.params
      const value = item[rule.key]

      if (operator === 'OR' && ruleFn(params as any, value)) {
        res.push(item)
        break
      } else if (operator === 'AND' && ruleFn(params as any, value)) {
        andChecks.push(true)
      }
    }

    if (rules.length === andChecks.length) {
      res.push(item);
    }
  }

  return res;
}

console.log(myFilter(ruleHandlers)(articles, [textLikeRule, titleEndLikeRule], FILTER_OPERATORS.OR));
// [{id: 1, "title":"justo. Praesent luctus. Curabitur", "text":"sapieen, gravida non, sollicitudin a,"},
// {id: 5, "title":"ut dolor dapibus gravida.","text":"ultricies adipiscing, enim mi tempor lorem, eget mollis"},
// {id: 9, "title":"a nunc. In at","text":"semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices"}]

console.log(myFilter(ruleHandlers)(articles, [textRegExpRule, titleStartLikeRule]));
// [{id: 1, "title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"},
// {id: 7, "title":"velit eu sem. Pellentesque","text":"Aliquam auctor, velit eget laoreet posuere, enim nisl elementum"}]

console.log(myFilter(ruleHandlers)(articles, [textRegExpRule, titleEndLikeRule], FILTER_OPERATORS.AND));
// [{id: 1, "title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"}]

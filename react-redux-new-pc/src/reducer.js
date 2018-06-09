var defaultState = {
	articles: [],
	title: 'heihei',
	content: 'content',
	zidingyi:['fjlkjf','kgjd',3]
}

export default function(state = defaultState, action) {

	if (action.type == "FETCH_ARTICLES_SUCC") {
		return Object.assign({}, state, {
			articles: action.articles
		})
	}

	if (action.type == "FETCH_CONTENT_SUCC") {
		return Object.assign({}, state, {
			content: action.content,
			title: action.title
		})
	}
	
	if (action.type == "FETCH_CONTENT") {
		return Object.assign({}, state, {
			zidingyi: action.zidingyi,
		})
	}

	return Object.assign({}, state)
} 
var defaultState = {
	articles: [],
	title: 'heihei',
	content: 'content'
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

	return Object.assign({}, state)
} 
// Since page transitions happen without reload, timers keep running even after leaving the page
// This is a timer implementation that will not run if the user has left the page

interface TimerHandle {
	clear(): void
}

export function timeout(func: () => void, ms: number): TimerHandle {
	let path = document.location.pathname
	let cancelled = false

	let id = setTimeout(function(){
		if(!cancelled && path === document.location.pathname) func()
	}, ms)

	return {
		clear(){
			cancelled = true
			clearTimeout(id)
		}
	}
}

export function interval(func: () => void, ms: number): TimerHandle {
	let path = document.location.pathname
	let cancelled = false

	let id = setInterval(function(){
		if(!cancelled && path === document.location.pathname)
			func()
		else if(cancelled || path !== document.location.pathname)
			clearInterval(id)
	}, ms)

	return {
		clear(){
			cancelled = true
			clearInterval(id)
		}
	}
}

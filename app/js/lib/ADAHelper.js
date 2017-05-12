const onKeyDown = (e)=> {
    if(e.keyCode === 13 || e.keyCode===32){
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.click()
    }
  }


export {onKeyDown as default, onKeyDown}

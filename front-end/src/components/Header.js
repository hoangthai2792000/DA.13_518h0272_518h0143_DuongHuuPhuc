import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='header-logo'>CT group</div>
        <div className='header-search'>
            <button type='primary' placeholder='Nhập từ khóa cần tìm'></button>
        </div>
    </div>
  )
}

export default Header
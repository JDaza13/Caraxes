import classes from './Header.module.scss';

const Header = () => {
	return (
		<div className={classes.header}>
			<div className='link-with-icon'>
				<a
					href='https://github.com/JDaza13/Caraxes'
					target='__blank'
				>
					<img src='/GitHub-Mark-64px.png' />
				</a>
			</div>
		</div>
	);
};

export default Header;

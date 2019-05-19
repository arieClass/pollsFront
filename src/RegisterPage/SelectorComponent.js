import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {

    },
    formControl: {

        minWidth: 420
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    state = {
        gender: 'male',
        name: 'hai',
        labelWidth: 0,
    };

    componentDidMount() {

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Gender</InputLabel>
                    <Select
                        value={this.state.gender}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'age-simple',
                        }}
                    >

                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>

                    </Select>
                </FormControl>

            </div>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
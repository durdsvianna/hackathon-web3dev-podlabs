import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu({data}) {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/dapp"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Home"
            />
          </ListItem>          
          {
            data && <>
              <ListItem
                classes={{ root: 'MuiListItem-indicators' }}
                button
                component={NavLink}
                to="/dapp/activities"
              >
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary="Manage"
                />
              </ListItem>
              <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  ref={ref}
                  onClick={handleOpen}
                >
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary={
                    <Box display="flex" alignItems="center">
                      Dev
                      <Box display="flex" alignItems="center" pl={0.3}>
                        <ExpandMoreTwoToneIcon fontSize="small" />
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </>
          }
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/dapp/activities">
          Activities
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/dapp/activity">
          Activity
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/dapp/activity-settings">
          Activity Settings
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components">
          Template
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;

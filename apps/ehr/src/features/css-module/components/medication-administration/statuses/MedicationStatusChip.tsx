import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Chip, Popover, Box, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { useMedicationManagement } from '../../../hooks/useMedicationManagement';
import { MedicationOrderStatusesType } from 'utils';
import { ExtendedMedicationDataForResponse } from 'utils';

interface MedicationStatusChipProps {
  medication?: ExtendedMedicationDataForResponse;
  onClick?: (newStatus: MedicationOrderStatusesType) => any;
  status?: MedicationOrderStatusesType;
  isEditable?: boolean;
}

interface ColorScheme {
  bg: string;
  text: string;
  border?: string;
}

const StyledChip = styled(Chip)(() => ({
  borderRadius: '8px',
  padding: '0 9px',
  margin: 0,
  height: '24px',
  '& .MuiChip-label': {
    padding: 0,
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
  '& .MuiChip-icon': {
    marginLeft: 'auto',
    marginRight: '-4px',
    order: 1,
  },
}));

const StatusMenuItem = styled(MenuItem)({
  padding: 0,
  '& .MuiChip-root': {
    width: '100%',
    borderRadius: '4px',
    justifyContent: 'flex-start',
  },
});

export const statusColors: Record<MedicationOrderStatusesType, ColorScheme> = {
  pending: { bg: '#f1f2f6', text: '#616161' },
  'administered-partly': { bg: '#B2EBF2', text: '#006064' },
  'administered-not': { bg: '#FECDD2', text: '#B71C1C' },
  administered: { bg: '#C8E6C9', text: '#1B5E20' },
  cancelled: { bg: '#FFFFFF', text: '#616161', border: '#BFC2C6' },
};

export const MedicationStatusChip: React.FC<MedicationStatusChipProps> = ({
  medication,
  onClick,
  status: currentStatus,
  isEditable = false,
}) => {
  const { getAvailableStatuses } = useMedicationManagement();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const status = (currentStatus ?? medication?.status ?? 'pending') as MedicationOrderStatusesType;

  const chipColors = statusColors[status] || { bg: '#F5F5F5', text: '#757575' };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (isEditable && onClick) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClosePopover = (): void => {
    setAnchorEl(null);
  };

  const handleStatusClick = async (newStatus: MedicationOrderStatusesType): Promise<void> => {
    if (onClick) {
      void onClick(newStatus);
      handleClosePopover();
    }
  };

  const availableStatuses = onClick ? getAvailableStatuses(medication?.status) : [];

  return (
    <>
      <StyledChip
        label={status}
        onClick={handleClick}
        icon={isEditable && onClick ? <ArrowDropDownIcon /> : undefined}
        sx={{
          backgroundColor: chipColors.bg,
          color: chipColors.text,
          border: chipColors.border ? `1px solid ${chipColors.border}` : 'none',
          '& .MuiSvgIcon-root': {
            color: 'inherit',
            fontSize: '1.2rem',
            margin: '0 -4px 0 2px',
          },
          cursor: isEditable && onClick ? 'pointer' : 'default',
        }}
      />
      {isEditable ? (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 1 }}>
            {availableStatuses.map((status) => (
              <StatusMenuItem key={status} onClick={() => handleStatusClick(status)}>
                <Chip
                  label={status}
                  sx={{
                    my: 0.5,
                    backgroundColor: statusColors[status].bg,
                    color: statusColors[status].text,
                    border: statusColors[status].border ? `1px solid ${statusColors[status].border}` : 'none',
                    fontWeight: 'bold',
                    '& .MuiChip-label': {
                      padding: '4px 8px',
                    },
                  }}
                />
              </StatusMenuItem>
            ))}
          </Box>
        </Popover>
      ) : null}
    </>
  );
};

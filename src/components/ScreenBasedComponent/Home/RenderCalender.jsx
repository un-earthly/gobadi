import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Text, SegmentedButtons, Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

const RenderCalendar = ({
    calendarView,
    setCalendarView,
    selectedDate,
    handleDateSelect,
    todayAppointments,
    renderAppointmentCard,
    t,
    styles,
    navigation
}) => {
    const renderWeeklyButton = (date) => (
        <TouchableOpacity
            key={date}
            style={styles.weeklyButton}
            onPress={() => handleDateSelect({ dateString: date })}
        >
            <Text>{new Date(date).getDate()}</Text>
        </TouchableOpacity>
    );

    const getWeekDates = () => {
        const curr = new Date(selectedDate || new Date());
        const week = [];
        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
            week.push(day);
        }
        return week;
    };
    return (
        <View style={styles.calendarContainer}>
            <SegmentedButtons
                value={calendarView}
                onValueChange={setCalendarView}
                buttons={[
                    { value: 'daily', label: t('dashboard.daily') },
                    { value: 'weekly', label: t('dashboard.weekly') },
                    { value: 'monthly', label: t('dashboard.monthly') },
                ]}
            />
            {calendarView === 'monthly' && (
                <Calendar
                    onDayPress={handleDateSelect}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: '#6D30ED' }
                    }}
                />
            )}
            {calendarView === 'weekly' && (
                <View style={styles.weeklyView}>
                    {getWeekDates().map(renderWeeklyButton)}
                </View>
            )}
            {calendarView === 'daily' && new Date() && (
                todayAppointments.length > 0 ? (
                    <View style={{ marginTop: 10 }}>
                        {todayAppointments.map(renderAppointmentCard)}
                    </View>
                ) : (
                    <View style={{
                        flexDirection: "column",
                        gap: 10
                    }}>
                        <Text style={styles.noDataText}>{t("dashboard.appointmentHistoryComingSoon")}</Text>
                        <Button mode="contained" onPress={() => { navigation.navigate("Menu") }} style={styles.seeAllButton}>
                            {t("addNewAppointment")}
                        </Button>
                    </View>
                )
            )}
        </View>
    );
};

export default RenderCalendar;